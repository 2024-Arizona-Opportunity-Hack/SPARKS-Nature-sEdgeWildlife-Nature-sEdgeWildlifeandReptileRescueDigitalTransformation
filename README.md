### NPO: [Nature's Edge Wildlife and Reptile Rescue](https://www.newrr.org/#donate)
### Slack Channel: [#npo-newrr](https://opportunity-hack.slack.com/archives/C07QT6792DQ)

## Team "SPARKS"
- [Shikha Verma](https://github.com/sverma89asu)
- [Sakshi Bajaj](https://github.com/skshbjj)
- [Kushagra Kartik](https://github.com/Kushagra1480)
- [Aaditya Bhilegaonkar](https://github.com/Aaditya-git)
- [Prathamesh Arun Lakawade](https://github.com/PrathameshLakawade)

## Problem Statement
Nature's Edge Wildlife and Reptile Rescue (NEWRR) faces challenges due to manual processes in managing donations, animal intake, and adoption forms. These methods are prone to inaccuracies, inefficiencies, and disorganization. They rely on spreadsheets and handwritten thank-you cards, which delay donor communication and complicate data management. Additionally, the lack of integration between existing tools (e.g., email platforms, third-party services) hinders operational efficiency. NEWRR requires a cloud-based solution to streamline these processes, automate communication, manage forms digitally, and improve donor engagement while ensuring compatibility with existing tools and user-friendly access for staff and volunteers.

## Project Overview
Our project offers a comprehensive cloud-based solution specifically designed for Nature’s Edge Wildlife and Reptile Rescue. It replaces the current manual processes with digital tools, streamlining the management of donations, automating the creation of personalized thank-you cards, and efficiently handling animal intake and adoption forms. This integrated platform enhances operational efficiency, allowing Nature’s Edge to focus more on wildlife rescue and rehabilitation while improving donor engagement and ensuring seamless compatibility with existing tools.

- [DevPost Projects]([https://devpost.com/submit-to/22174-opportunity-hack-2024-october-asu-tempe-arizona-ohack-dev/manage/submissions](https://devpost.com/software/sparks-c4t8xo))
- [YouTube Pitch]([https://www.youtube.com](https://youtu.be/-YkzmhClESU))

## Tech Stack
The backend is built using:
- FastAPI
- PostgreSQL

The frontend is built using:
- React
- Bootstrap

The cloud solution for this is built using:
- Railway

## Getting Started
Follow these instructions to set up and run the project locally.

### Prerequisites
Ensure you have the following installed:
-  [Node.js](https://nodejs.org/en/download/package-manager)
-  [Python](https://www.python.org/downloads/)

### Cloning the Repository
Start by cloning the project repository:
```bash

git clone https://github.com/2024-Arizona-Opportunity-Hack/SPARKS-Nature-sEdgeWildlife-Nature-sEdgeWildlifeandReptileRescueDigitalTransformation.git
cd SPARKS-Nature-sEdgeWildlife-Nature-sEdgeWildlifeandReptileRescueDigitalTransformation/
```

### Frontend Setup
Navigate to the client directory, install the required packages, and start the frontend:
```bash

cd client
npm install
npm start
```
This will start the React frontend on localhost:3000.

### Backend Setup
In a new terminal window, navigate to the server directory, install the necessary Python dependencies, and start the backend:
```bash
cd server
pip install -r requirements.txt
uvicorn main:app --reload
```
This will start the FastAPI backend on localhost:8000.

## Challenges we ran into
One significant challenge we encountered was the inability to successfully integrate a donation management system with third-party services such as GiveButter and PayPal Donations. The primary reason for this is that most of these services require details that we are currently unable to provide, such as bank account numbers and license IDs. To address this issue, we have temporarily developed a mock-up to illustrate how the donation transaction process would look.

## Accomplishments that we are proud of
The solution we developed is the core of our project, and we're proud of its functionality. While not without its limitations, it effectively addresses the key challenges faced by Nature's Edge Wildlife and Reptile Rescue, especially considering we built it within a short timeframe. With further refinement, we believe this system can be optimized even more, and we look forward to improving it as we continue to collaborate with Nature's Edge.

## What we learned
Through working with Nature's Edge Wildlife and Reptile Rescue, we gained valuable insights into the challenges faced by nonprofit organizations in managing their operations with limited resources. Understanding the complexities of donation tracking, animal intake, and adoption processes helped us better tailor our solution to their needs. It was a rewarding experience to develop a system that has the potential to streamline their workflow and enhance their ability to focus on their mission of wildlife rescue and rehabilitation.
