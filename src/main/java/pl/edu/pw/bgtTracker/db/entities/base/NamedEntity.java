package pl.edu.pw.bgtTracker.db.entities.base;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;

@Data
@EqualsAndHashCode(callSuper = true)
@MappedSuperclass
public abstract class NamedEntity extends BaseEntity {

    @Column(nullable = false)
    @NotNull(message = "Name must not be null")
    protected String name;
}
