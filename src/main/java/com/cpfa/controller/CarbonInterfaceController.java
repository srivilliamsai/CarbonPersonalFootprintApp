package com.cpfa.controller;

import com.cpfa.service.CarbonInterfaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/external")
@CrossOrigin(origins = "http://localhost:5173")
public class CarbonInterfaceController {

    @Autowired
    private CarbonInterfaceService carbonInterfaceService;

    @GetMapping("/emission-factor")
    public double getEmissionFactor(@RequestParam String type) {
        return carbonInterfaceService.getEmissionFactor(type);
    }
}
