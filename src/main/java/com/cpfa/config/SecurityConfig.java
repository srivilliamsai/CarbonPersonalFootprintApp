package com.cpfa.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	@org.springframework.beans.factory.annotation.Autowired
	private JwtFilter jwtFilter;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable())
				.cors(Customizer.withDefaults())
				.authorizeHttpRequests(
						auth -> auth.requestMatchers("/", "/auth/**", "/api/external/**")
								.permitAll()
								.anyRequest().authenticated())
				.httpBasic(Customizer.withDefaults());

		http.addFilterBefore(jwtFilter,
				org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
}