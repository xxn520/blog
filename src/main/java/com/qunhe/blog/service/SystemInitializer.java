package com.qunhe.blog.service;

import com.qunhe.blog.dao.AccountRepository;
import com.qunhe.blog.dao.UserGroupRepository;
import com.qunhe.blog.dao.UserRepository;
import com.qunhe.blog.model.Account;
import com.qunhe.blog.model.User;
import com.qunhe.blog.model.UserGroup;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
public class SystemInitializer extends BlogInitializer {

    @Inject
    private UserGroupRepository userGroupRepository;

    @Inject
    private UserRepository userRepository;

    @Inject
    private AccountRepository accountRepository;

    @Inject
    private PasswordEncoder passwordEncoder;

    @PersistenceContext
    private EntityManager em;

    @Override
    @Transactional
    protected void doInit() {
        // 权限初始化
        if (accountRepository.count()==0) {
            Account account = new Account("admin", "123456");
            account.setPassword(passwordEncoder.encode(account.getPassword()));
            UserGroup adminGroup = new UserGroup("管理员", "ROLE_ADMIN", "ROLE_USER");
            UserGroup userGroup = new UserGroup("用户", "ROLE_USER");
            this.userGroupRepository.save(adminGroup);
            this.userGroupRepository.save(userGroup);
            User user = new User(account.getUsername());
            user.setGroup(adminGroup);
            this.userRepository.save(user);
            account.setUser(user);
            this.accountRepository.save(account);
        }
        // 创建索引
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(em);
        try {
            fullTextEntityManager.createIndexer().startAndWait();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
