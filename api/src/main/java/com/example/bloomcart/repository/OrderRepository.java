package com.example.bloomcart.repository;

import com.example.bloomcart.dto.OrderDto;
import com.example.bloomcart.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o ORDER BY ABS(CURRENT_DATE - o.deliveryDate)")
    List<Order> findAllByClosestDeliveryDate();
}
