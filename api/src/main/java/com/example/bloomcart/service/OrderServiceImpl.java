package com.example.bloomcart.service;

import com.example.bloomcart.dto.OrderDto;
import com.example.bloomcart.dto.OrderItemDto;
import com.example.bloomcart.mapper.OrderMapper;
import com.example.bloomcart.model.Order;
import com.example.bloomcart.model.OrderItem;
import com.example.bloomcart.repository.OrderRepository;
import com.example.bloomcart.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final ProductRepository productRepository;

    public OrderServiceImpl(OrderRepository orderRepository, OrderMapper orderMapper, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public OrderDto createOrder(OrderDto orderDto) {

        if (orderDto.getDeliveryDate() == null || orderDto.getDeliveryDate().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Delivery date is invalid");
        }

        Order order = orderMapper.toEntity(orderDto);
        order.setStatus("PENDING");

        if (orderDto.getOrderItems() != null && !orderDto.getOrderItems().isEmpty()) {
            order.setTotalPrice(calculateTotalPrice(orderDto.getOrderItems(), order));
        }

        Order savedOrder = orderRepository.save(order);
        return orderMapper.toDto(savedOrder);
    }

    private BigDecimal calculateTotalPrice(Set<OrderItemDto> orderItemDtos, Order order) {
        BigDecimal totalPrice = BigDecimal.ZERO;

        if (order.getOrderItems() == null) {
            order.setOrderItems(new HashSet<>());
        } else {
            order.getOrderItems().clear();
        }

        for (OrderItemDto itemDto : orderItemDtos) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(productRepository.getReferenceById(itemDto.getProductId()));
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setPrice(itemDto.getPrice());
            order.getOrderItems().add(orderItem);

            BigDecimal itemTotal = itemDto.getPrice().multiply(BigDecimal.valueOf(itemDto.getQuantity()));
            totalPrice = totalPrice.add(itemTotal);
        }
        return totalPrice;
    }

    @Override
    @Transactional
    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();

        LocalDate today = LocalDate.now();
        orders.sort((o1, o2) -> {
            LocalDate d1 = o1.getDeliveryDate().toLocalDate();
            LocalDate d2 = o2.getDeliveryDate().toLocalDate();
            long diff1 = Math.abs(ChronoUnit.DAYS.between(today, d1));
            long diff2 = Math.abs(ChronoUnit.DAYS.between(today, d2));
            return Long.compare(diff1, diff2);
        });

        return orders.stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public OrderDto getOrderById(long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
        return orderMapper.toDto(order);
    }

    @Override
    @Transactional
    public OrderDto updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        order.setStatus(status);
        return orderMapper.toDto(orderRepository.save(order));
    }
}
