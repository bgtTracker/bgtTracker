package pl.edu.pw.bgtTracker.api.auth;

import org.springframework.data.spel.spi.EvaluationContextExtension;
import org.springframework.security.access.expression.SecurityExpressionRoot;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

class SecurityEvaluationContextExtension implements EvaluationContextExtension {
    @Override
    public String getExtensionId() {
        return "security";
    }

    @Override
    public SecurityExpressionRoot getRootObject() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return new SecurityExpressionRoot(authentication) {};
    }
}