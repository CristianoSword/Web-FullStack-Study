package com.study.qa.web;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tracks")
public class TrackController {

    @GetMapping
    public List<TrackResponse> listTracks() {
        return List.of(
            new TrackResponse("qa", 6),
            new TrackResponse("devops", 8)
        );
    }

    public record TrackResponse(String name, int modules) {
    }
}
