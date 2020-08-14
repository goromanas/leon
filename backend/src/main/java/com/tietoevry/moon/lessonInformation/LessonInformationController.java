package com.tietoevry.moon.lessonInformation;

import com.tietoevry.moon.lessonInformation.model.Dto.LessonInformationDto;
import com.tietoevry.moon.user.model.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LessonInformationController {
    @Autowired
    LessonInformationService lessonInformationService;
    @RequestMapping(path = "/lessonInformation", method = RequestMethod.POST)
    public LessonInformationDto createLessonInformation(@RequestBody LessonInformationDto lessonInformation) {
        System.out.println(lessonInformation);
        return lessonInformationService.createLessonInformation(lessonInformation);
    }

}
