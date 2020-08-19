package com.tietoevry.moon.chat.model.Dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter @Setter
public class ChatMessagesDto {
    private long id;
    private String chatId;
    private String author;
    private String content;
    private LocalDate date;

}
