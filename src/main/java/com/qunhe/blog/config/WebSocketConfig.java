package com.qunhe.blog.config;

import com.qunhe.blog.jersey.HibernateJacksonContextResolver;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configurable
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler(), "/websocket").setAllowedOrigins("*");
    }

    @Bean
    public MessageWebSocketHandler webSocketHandler() {
        return new MessageWebSocketHandler();
    }

    @Bean
    public HibernateJacksonContextResolver hjResolver() {
        return new HibernateJacksonContextResolver();
    }

}
