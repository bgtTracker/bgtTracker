package pl.edu.pw.bgtTracker.api.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import pl.edu.pw.bgtTracker.db.entities.AppUser;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.Serializable;

public class PermissionEvaluatorImpl implements PermissionEvaluator {
    private final Logger logger = LoggerFactory.getLogger(PermissionEvaluatorImpl.class);
    @PersistenceContext EntityManager manager;

    @Override
    public boolean hasPermission(Authentication auth, Object target, Object permission) {
        try {
            var getUser = target.getClass().getMethod("getUser");
            return ((AppUser) getUser.invoke(target)).getEmail().equals(auth.getName());
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean hasPermission(Authentication auth, Serializable targetId, String targetType, Object permission) {
        try {
            Class.forName(targetType).getAnnotation(Entity.class);
            var segments = targetType.split("\\.");
            var entityName = segments[segments.length - 1];
            var query = manager.createQuery("select e from " + entityName + " e where e.id = " + targetId);
            return hasPermission(auth, query.getSingleResult(), permission);
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }
}
