package com.tietoevry.moon.chat;

import com.tietoevry.moon.chat.model.Dto.ChatMessagesDto;
import com.tietoevry.moon.user.model.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChatController {

    @Autowired
    ChatService chatService;

    @RequestMapping(path = "/chatMessages", method = RequestMethod.GET)
    public List<ChatMessagesDto> getChatMessages () {
        return chatService.getChatMessages();
    }




}
