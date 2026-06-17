package com.resolvehub.service;

import com.campuspulse.model.Report;
import com.campuspulse.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final ReportRepository reportRepository;

    public DashboardService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public List<Report> getSubmittedReports() {
        return reportRepository.findByStatus("Submitted");
    }
}
