import { Injectable } from '@angular/core';
import { patient } from '../Interface/patientRegistration';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patients: patient[] = [
    { id: "CBE000001", clinicPlace: "Coimbatore", name: "John Doe", age: 30, phoneNumber: "9876543210", address: "123 Main St, Coimbatore", occupation: "Engineer", surgeryHistory: "Appendectomy", previousHistory: "Hypertension", symptoms: "Headache", complaints: "Dizziness" },
    { id: "CBE000002", clinicPlace: "Coimbatore", name: "Jane Smith", age: 25, phoneNumber: "9876543211", address: "456 Oak St, Coimbatore", occupation: "Teacher", surgeryHistory: "N/A", previousHistory: "Asthma", symptoms: "Shortness of breath", complaints: "Chest tightness" },
    { id: "CBE000003", clinicPlace: "Coimbatore", name: "Mike Johnson", age: 40, phoneNumber: "9876543212", address: "789 Maple St, Coimbatore", occupation: "Driver", surgeryHistory: "Knee surgery", previousHistory: "N/A", symptoms: "Joint pain", complaints: "Difficulty walking" },
    { id: "CBE000004", clinicPlace: "Coimbatore", name: "Emily Davis", age: 35, phoneNumber: "9876543213", address: "321 Pine St, Coimbatore", occupation: "Nurse", surgeryHistory: "C-section", previousHistory: "Diabetes", symptoms: "Fatigue", complaints: "Weight gain" },
    { id: "CBE000005", clinicPlace: "Coimbatore", name: "Chris Brown", age: 28, phoneNumber: "9876543214", address: "654 Elm St, Coimbatore", occupation: "Accountant", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Nausea", complaints: "Abdominal pain" },

    { id: "DPM000001", clinicPlace: "Dharapuram", name: "Tom Clark", age: 45, phoneNumber: "9876543215", address: "123 Cedar St, Dharapuram", occupation: "Farmer", surgeryHistory: "N/A", previousHistory: "Back pain", symptoms: "Muscle spasms", complaints: "Stiffness" },
    { id: "DPM000002", clinicPlace: "Dharapuram", name: "Anna Lee", age: 32, phoneNumber: "9876543216", address: "456 Birch St, Dharapuram", occupation: "Designer", surgeryHistory: "N/A", previousHistory: "Anemia", symptoms: "Dizziness", complaints: "Low energy" },
    { id: "DPM000003", clinicPlace: "Dharapuram", name: "Bob Miller", age: 37, phoneNumber: "9876543217", address: "789 Spruce St, Dharapuram", occupation: "Chef", surgeryHistory: "Hernia surgery", previousHistory: "N/A", symptoms: "Abdominal pain", complaints: "Discomfort" },
    { id: "DPM000004", clinicPlace: "Dharapuram", name: "Sara Wilson", age: 29, phoneNumber: "9876543218", address: "321 Ash St, Dharapuram", occupation: "Doctor", surgeryHistory: "Tonsillectomy", previousHistory: "N/A", symptoms: "Sore throat", complaints: "Swallowing difficulty" },
    { id: "DPM000005", clinicPlace: "Dharapuram", name: "Kevin Garcia", age: 33, phoneNumber: "9876543219", address: "654 Willow St, Dharapuram", occupation: "Electrician", surgeryHistory: "Appendectomy", previousHistory: "N/A", symptoms: "Fever", complaints: "Body aches" },

    { id: "UDT000001", clinicPlace: "Udumalpet", name: "Linda Anderson", age: 50, phoneNumber: "9876543220", address: "123 Hickory St, Udumalpet", occupation: "Manager", surgeryHistory: "Gallbladder removal", previousHistory: "Hypertension", symptoms: "High blood pressure", complaints: "Fatigue" },
    { id: "UDT000002", clinicPlace: "Udumalpet", name: "James Thomas", age: 27, phoneNumber: "9876543221", address: "456 Maple Ave, Udumalpet", occupation: "Architect", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Headache", complaints: "Migraine" },
    { id: "UDT000003", clinicPlace: "Udumalpet", name: "Lisa Martinez", age: 36, phoneNumber: "9876543222", address: "789 Poplar St, Udumalpet", occupation: "Teacher", surgeryHistory: "N/A", previousHistory: "Asthma", symptoms: "Cough", complaints: "Wheezing" },
    { id: "UDT000004", clinicPlace: "Udumalpet", name: "David White", age: 42, phoneNumber: "9876543223", address: "321 Birch Ave, Udumalpet", occupation: "Lawyer", surgeryHistory: "N/A", previousHistory: "Diabetes", symptoms: "Thirst", complaints: "Increased urination" },
    { id: "UDT000005", clinicPlace: "Udumalpet", name: "Karen Harris", age: 55, phoneNumber: "9876543224", address: "654 Pine Ave, Udumalpet", occupation: "Retired", surgeryHistory: "Heart bypass", previousHistory: "Heart disease", symptoms: "Chest pain", complaints: "Shortness of breath" },

    // Additional records for Pollachi, Palani, Palladam, Pongalur, Chittode, and Tiruppur
    { id: "PLC000001", clinicPlace: "Pollachi", name: "Sam Green", age: 38, phoneNumber: "9876543225", address: "789 Olive St, Pollachi", occupation: "Salesman", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Fatigue", complaints: "Difficulty concentrating" },
    { id: "PLC000002", clinicPlace: "Pollachi", name: "Nina Black", age: 31, phoneNumber: "9876543226", address: "321 Elm St, Pollachi", occupation: "Banker", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Chest pain", complaints: "Shortness of breath" },
    { id: "PLC000003", clinicPlace: "Pollachi", name: "Rob Stewart", age: 44, phoneNumber: "9876543227", address: "654 Cedar St, Pollachi", occupation: "Technician", surgeryHistory: "Appendectomy", previousHistory: "Hypertension", symptoms: "Headache", complaints: "Dizziness" },
    { id: "PLC000004", clinicPlace: "Pollachi", name: "Rachel Adams", age: 29, phoneNumber: "9876543228", address: "456 Walnut St, Pollachi", occupation: "Student", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Fever", complaints: "Body aches" },
    { id: "PLC000005", clinicPlace: "Pollachi", name: "Harry Scott", age: 48, phoneNumber: "9876543229", address: "123 Willow St, Pollachi", occupation: "Professor", surgeryHistory: "N/A", previousHistory: "Diabetes", symptoms: "Fatigue", complaints: "Thirst" },

    { id: "PLM000001", clinicPlace: "Palani", name: "Olivia Clark", age: 29, phoneNumber: "9876543230", address: "123 Apple St, Palani", occupation: "Artist", surgeryHistory: "N/A", previousHistory: "Allergy", symptoms: "Skin rash", complaints: "Itching" },
    { id: "PLM000002", clinicPlace: "Palani", name: "Liam Baker", age: 42, phoneNumber: "9876543231", address: "456 Grape St, Palani", occupation: "Chef", surgeryHistory: "Gallbladder removal", previousHistory: "N/A", symptoms: "Abdominal pain", complaints: "Nausea" },
    { id: "PLM000003", clinicPlace: "Palani", name: "Sophia Taylor", age: 36, phoneNumber: "9876543232", address: "789 Mango St, Palani", occupation: "Software Developer", surgeryHistory: "N/A", previousHistory: "Anxiety", symptoms: "Headache", complaints: "Stress" },
    { id: "PLM000004", clinicPlace: "Palani", name: "Noah Anderson", age: 50, phoneNumber: "9876543233", address: "321 Cherry St, Palani", occupation: "Mechanic", surgeryHistory: "Knee surgery", previousHistory: "N/A", symptoms: "Joint pain", complaints: "Swelling" },
    { id: "PLM000005", clinicPlace: "Palani", name: "Isabella Lewis", age: 45, phoneNumber: "9876543234", address: "654 Pear St, Palani", occupation: "Scientist", surgeryHistory: "N/A", previousHistory: "Diabetes", symptoms: "Frequent urination", complaints: "Thirst" },

    { id: "PLD000001", clinicPlace: "Palladam", name: "Mason Moore", age: 60, phoneNumber: "9876543235", address: "123 Plum St, Palladam", occupation: "Retired", surgeryHistory: "Hip replacement", previousHistory: "Arthritis", symptoms: "Pain", complaints: "Mobility issues" },
    { id: "PLD000002", clinicPlace: "Palladam", name: "Evelyn Martin", age: 34, phoneNumber: "9876543236", address: "456 Banana St, Palladam", occupation: "Dentist", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Jaw pain", complaints: "Headache" },
    { id: "PLD000003", clinicPlace: "Palladam", name: "Logan Thompson", age: 39, phoneNumber: "9876543237", address: "789 Lemon St, Palladam", occupation: "Police Officer", surgeryHistory: "N/A", previousHistory: "Hypertension", symptoms: "Fatigue", complaints: "Lightheadedness" },
    { id: "PLD000004", clinicPlace: "Palladam", name: "Grace Robinson", age: 28, phoneNumber: "9876543238", address: "321 Fig St, Palladam", occupation: "Designer", surgeryHistory: "N/A", previousHistory: "Asthma", symptoms: "Wheezing", complaints: "Shortness of breath" },
    { id: "PLD000005", clinicPlace: "Palladam", name: "Lucas Walker", age: 43, phoneNumber: "9876543239", address: "654 Peach St, Palladam", occupation: "Construction Worker", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Back pain", complaints: "Muscle strain" },

    { id: "PGR000001", clinicPlace: "Pongalur", name: "Chloe Young", age: 55, phoneNumber: "9876543240", address: "123 Apricot St, Pongalur", occupation: "Retired", surgeryHistory: "Appendectomy", previousHistory: "N/A", symptoms: "Stomach pain", complaints: "Nausea" },
    { id: "PGR000002", clinicPlace: "Pongalur", name: "Henry Hall", age: 26, phoneNumber: "9876543241", address: "456 Kiwi St, Pongalur", occupation: "Graphic Designer", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Eye strain", complaints: "Headache" },
    { id: "PGR000003", clinicPlace: "Pongalur", name: "Ava Allen", age: 32, phoneNumber: "9876543242", address: "789 Strawberry St, Pongalur", occupation: "Accountant", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Headache", complaints: "Dizziness" },
    { id: "PGR000004", clinicPlace: "Pongalur", name: "William King", age: 38, phoneNumber: "9876543243", address: "321 Orange St, Pongalur", occupation: "Electrician", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Numbness", complaints: "Weakness" },
    { id: "PGR000005", clinicPlace: "Pongalur", name: "Emily Wright", age: 40, phoneNumber: "9876543244", address: "654 Papaya St, Pongalur", occupation: "Pharmacist", surgeryHistory: "N/A", previousHistory: "Allergy", symptoms: "Sneezing", complaints: "Runny nose" },

    { id: "CHD000001", clinicPlace: "Chittode", name: "Jack Hill", age: 47, phoneNumber: "9876543245", address: "123 Lime St, Chittode", occupation: "Banker", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Chest pain", complaints: "Difficulty breathing" },
    { id: "CHD000002", clinicPlace: "Chittode", name: "Aria Scott", age: 36, phoneNumber: "9876543246", address: "456 Nectarine St, Chittode", occupation: "Teacher", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Sore throat", complaints: "Cough" },
    { id: "CHD000003", clinicPlace: "Chittode", name: "Zoe Adams", age: 24, phoneNumber: "9876543247", address: "789 Peach St, Chittode", occupation: "Researcher", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Fatigue", complaints: "Difficulty sleeping" },
    { id: "CHD000004", clinicPlace: "Chittode", name: "Alex Baker", age: 59, phoneNumber: "9876543248", address: "321 Pineapple St, Chittode", occupation: "Retired", surgeryHistory: "Heart bypass", previousHistory: "Heart disease", symptoms: "Chest pain", complaints: "Shortness of breath" },
    { id: "CHD000005", clinicPlace: "Chittode", name: "Ella Ramirez", age: 30, phoneNumber: "9876543249", address: "654 Cherry St, Chittode", occupation: "Fitness Trainer", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Joint pain", complaints: "Muscle weakness" },

    { id: "TPR000001", clinicPlace: "Tiruppur", name: "Daniel Wilson", age: 41, phoneNumber: "9876543250", address: "123 Grapefruit St, Tiruppur", occupation: "Sales Manager", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Headache", complaints: "Stress" },
    { id: "TPR000002", clinicPlace: "Tiruppur", name: "Madison Lopez", age: 37, phoneNumber: "9876543251", address: "456 Blueberry St, Tiruppur", occupation: "Chef", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Nausea", complaints: "Stomach pain" },
    { id: "TPR000003", clinicPlace: "Tiruppur", name: "Lucas Perez", age: 33, phoneNumber: "9876543252", address: "789 Blackberry St, Tiruppur", occupation: "Engineer", surgeryHistory: "N/A", previousHistory: "N/A", symptoms: "Eye strain", complaints: "Headache" },
    { id: "TPR000004", clinicPlace: "Tiruppur", name: "Scarlett Stewart", age: 29, phoneNumber: "9876543253", address: "321 Fig St, Tiruppur", occupation: "Writer", surgeryHistory: "N/A", previousHistory: "Asthma", symptoms: "Shortness of breath", complaints: "Chest tightness" },
  ];
  constructor() { }

  addPatient(patient: patient) {
    this.patients.push(patient);
  }

  getPatients() {
    return this.patients;
  }

  getPatientById(id: string): patient[] | undefined {
    return this.patients.filter(patient => patient.id === id);
  }
}
