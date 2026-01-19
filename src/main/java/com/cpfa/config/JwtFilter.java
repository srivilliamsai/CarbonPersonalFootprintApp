package com.cpfa.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.servlet.FilterChain;
import jakarta.servlet.GenericFilter;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

@SuppressWarnings("serial")
@Component
public class JwtFilter extends GenericFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;

		String auth = req.getHeader("Authorization");

		if (auth != null && auth.startsWith("Bearer")) {
			String token = auth.substring(7);
			jwtUtil.extractEmail(token);
		}

		chain.doFilter(request, response);
	}

}
