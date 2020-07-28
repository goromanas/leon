package com.tietoevry.moon.swagger;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "swagger")
@Getter
@Setter
public class SwaggerProperties {

    private String host;
}
