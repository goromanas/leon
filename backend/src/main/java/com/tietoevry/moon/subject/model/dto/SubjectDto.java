package com.tietoevry.moon.subject.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter @Setter
public class SubjectDto {
    private Long id;
    private String name;
    private String description;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SubjectDto that = (SubjectDto) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
