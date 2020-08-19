package com.tietoevry.moon.chat;

import com.tietoevry.moon.chat.model.ChatMessages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessagesRepository extends JpaRepository<ChatMessages, Long> {
}
