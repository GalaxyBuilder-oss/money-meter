package com.gb.moneymeter.configurations;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class Swagger {

    @Bean
    public OpenAPI openAPI() {

        List<Server> server = new ArrayList<>();
        server.add(new Server().url("http://localhost:8080")
                .description("Offline Server"));
        server.add(new Server().url("http://54.251.134.88")
                .description("Online Server"));

        Contact contact = new Contact()
                .email("galaxybuilder.oss@gmail.com")
                .name("Support");

        License license = new License()
                .name("MIT License")
                .url("http://www.mit-test.com");

        Info info = new Info()
                .title("Money Meter")
                .version("1.0")
                .description("Money Meter")
                .contact(contact)
                .termsOfService("tos")
                .license(license)
                .summary("Money Meter");

        SecurityScheme securityScheme = new SecurityScheme().type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("bearer");

        return new OpenAPI().components(
                        new Components().addSecuritySchemes("Bearer Authentication", securityScheme)).info(info).servers(server);
    }
}
