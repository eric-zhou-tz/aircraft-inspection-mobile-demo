# aircraft-inspection-mobile-demo
End-to-end aircraft inspection app (demo/reconstruction) where users upload images to detect structural issues via a lightweight pretrained CV model. Includes mobile frontend, API backend, and inference pipeline.
# Aircraft Inspection Mobile Demo

A representative mobile-style demo for aircraft surface inspection and issue highlighting.

## Overview
This repository showcases a simplified mobile inspection workflow for aircraft surface issue detection. The original concept was a phone-based application that allowed users to capture aircraft images and receive issue highlights directly in the app. This public version focuses on demonstrating the product flow and system architecture using representative demo components.

## Problem
Aircraft surface inspection is labor-intensive and often requires careful manual review. A mobile workflow could help accelerate triage by surfacing likely issue areas for further inspection.

## Demo Scope
This demo allows users to upload or select an airplane image, run a simplified analysis flow, and view annotated issue areas with labels, confidence, and recommendations.

## System Architecture
Frontend: React web app styled like a phone screen  
Backend: FastAPI  
Image annotation: OpenCV  
Detection approach: representative demo detections for sample images

## Product Flow
1. User uploads or selects an aircraft image
2. App sends image data to backend
3. Backend returns representative detections
4. App displays annotated image and findings
5. User reviews flagged regions

## Technical Notes
This public repository is a simplified representative demo of the product concept. Proprietary datasets, model training pipelines, and production infrastructure from the original work are not included.

## Future Improvements
- On-device inference
- Real defect detection model
- Inspection history storage
- Technician workflow integration
- Offline mobile support