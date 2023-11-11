package com.capstone.grocery.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.grocery.model.User;
import com.capstone.grocery.repository.UserRepository;
import com.capstone.grocery.response.CommonResponse;
import com.capstone.grocery.service.UserService;
import com.capstone.grocery.utility.Utility;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public CommonResponse<List<User>> getAllUsers() {
        try {
            List<User> userList = userRepository.findAll();
            // TODO
            return Utility.getCommonResponse(200, true, "Users List", null, userList);
        } catch (Exception exc) {
            // TODO
            return Utility.getCommonResponse(404, false, "Users Not Found Error: " + exc, null, null);
        }
    }

    @Override
    public CommonResponse<User> getUserById(String UserId) {
        try {
            User user = userRepository.findById(UserId).get();
            // TODO
            return Utility.getCommonResponse(200, true, "User Found", null, user);
        } catch (Exception exc) {
            // TODO
            return Utility.getCommonResponse(404, false, "User Not Found Error: " + exc, null, null);
        }
    }

    @Override
    public CommonResponse<User> postNewUser(User user) {
        try {
            userRepository.save(user);
            // TODO
            return Utility.getCommonResponse(200, true, "User Added Successfully", null, user);
        } catch (Exception exc) {
            // TODO
            return Utility.getCommonResponse(404, false, "User Not Created Error: " + exc, null, null);
        }
    }

    @Override
    public CommonResponse<User> updateUser(String UserId, User user) {
        try {
            User oldUser = userRepository.findById(UserId).get();
            oldUser.setAllAttributes(user);
            userRepository.save(oldUser);
            // TODO
            return Utility.getCommonResponse(200, true, "User Updated", null, oldUser);
        } catch (Exception exc) {
            // TODO
            return Utility.getCommonResponse(404, false, "User Not Found Error: " + exc, null, null);
        }
    }

    @Override
    public CommonResponse<User> deleteUser(String UserId) {
        try {
            User user = userRepository.findById(UserId).get();
            userRepository.delete(user);
            // TODO
            return Utility.getCommonResponse(200, true, "User Deleted", null, user);
        } catch (Exception exc) {
            // TODO
            return Utility.getCommonResponse(404, false, "User Not Found Error: " + exc, null, null);
        }
    }

}
