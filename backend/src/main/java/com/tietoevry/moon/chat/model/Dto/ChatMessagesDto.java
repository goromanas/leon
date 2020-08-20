package com.tietoevry.moon.chat.model.Dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter @Setter
public class ChatMessagesDto {
    private long id;
    private int channel;
    private String classname;
    private String username;
    private String content;
    private Date date;

}
