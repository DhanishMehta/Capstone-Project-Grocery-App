package com.capstone.grocery.service.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.capstone.grocery.model.Order;
import com.capstone.grocery.repository.OrderRepository;
import com.capstone.grocery.response.CommonResponse;
import com.capstone.grocery.service.OrderService;
import com.capstone.grocery.utility.Utility;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;

    @Override
    public CommonResponse<List<Order>> getAllOrders() {
        try{
            List<Order> orderList = this.orderRepository.findAll();
            return Utility.getCommonResponse(200, true, "All orders", null, orderList);
        } catch (Exception exc) {
            return Utility.getCommonResponse(404, false, "Orders Not found", null, null);
        }
    }
    
    @Override
    public CommonResponse<Order> getOrderById(String orderId) {
        try{
            Order order = this.orderRepository.findById(orderId).get();
            return Utility.getCommonResponse(200, true, "Order Found", null, order);
        } catch (Exception exc) {
            return Utility.getCommonResponse(404, false, "Orders Not found", null, null);
        }
    }
    
    @Override
    public CommonResponse<Order> postOrder(Order newOrder) {
        try{
            this.orderRepository.save(newOrder);
            return Utility.getCommonResponse(200, true, "Order Posted", null, newOrder);
        } catch (Exception exc) {
            return Utility.getCommonResponse(404, false, "Orders Not found", null, null);
        }
    }
    

}
