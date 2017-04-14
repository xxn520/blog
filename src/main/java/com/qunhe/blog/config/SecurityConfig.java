package com.qunhe.blog.config;

import com.qunhe.blog.Constants;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.inject.Inject;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(jsr250Enabled = true, securedEnabled = true)
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Inject
    private UserDetailsService userDetailsService;

    @Inject
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Configuration
    @Order(1)
    public static class ApiWebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/api/**")
                    .authorizeRequests()
                    .anyRequest()
                    .permitAll()
                    .and()
                    .httpBasic()
                    .and()
                    .logout()
                    .logoutUrl("/api/signout")
                    .and()
                    .csrf()
                    .disable()
                    .headers()
                    .contentTypeOptions()
                    .disable();
        }
    }

    @Configuration
    @Order(2)
    public static class FormLoginWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

        @Override
        public void configure(WebSecurity web) throws Exception {
            web.ignoring()
                    .antMatchers(Constants.ADMIN_PATH + "login.html");
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher(Constants.ADMIN_PATH + "**")
                    .authorizeRequests()
                    .anyRequest()
                    .hasAnyRole("ADMIN")
                    .and().formLogin()
                    .loginProcessingUrl(Constants.ADMIN_PATH + "login.do")
                    .loginPage(Constants.ADMIN_PATH + "login.html")
                    .defaultSuccessUrl(Constants.ADMIN_PATH + "index.html")
                    .usernameParameter("username")
                    .passwordParameter("password")
                    .and()
                    .logout()
                    .logoutSuccessUrl(Constants.ADMIN_PATH + "index.html")
                    .logoutUrl(Constants.ADMIN_PATH + "logout.do")
                    .invalidateHttpSession(true)
                    .and()
                    .rememberMe()
                    .and()
                    .csrf()
                    .disable()
                    .headers()
                    .contentTypeOptions()
                    .disable();
        }
    }
}
