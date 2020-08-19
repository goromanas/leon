package com.tietoevry.moon.lessonInformation.model.Dto;


import com.tietoevry.moon.lessonInformation.model.Assignment;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Getter @Setter
public class LessonInformationDto {
    private Long id;
    private LocalDate date;
    private String topic;
    private String information;
    private List<String> assignment;
    private Long lessonId;
}
