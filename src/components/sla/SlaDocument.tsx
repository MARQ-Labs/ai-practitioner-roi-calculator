
import React from 'react';

interface SlaFormData {
  providerName: string;
  providerJurisdiction: string;
  providerAddress: string;
  customerName: string;
  customerJurisdiction: string;
  customerAddress: string;
  effectiveDate: string;
  uptime: string;
  inferenceLatency: string;
  requestThroughput: string;
  concurrentUsers: string;
  modelAccuracy: string;
  qualityScore: string;
  contentSafety: string;
  securityAssessment: string;
  securityPatchTime: string;
  incidentNotificationTime: string;
  systemUpdateFrequency: string;
  updateNotificationTime: string;
  maintenanceHours: string;
  supportEmail: string;
  supportPhone: string;
  supportWebPortal: string;
  supportChat: string;
  timezone: string;
  governingLaw: string;
}

interface SlaDocumentProps {
  data: SlaFormData;
}

const SlaDocument: React.FC<SlaDocumentProps> = ({ data }) => {
  // Function to display placeholder if field is empty
  const displayField = (value: string, placeholder: string) => {
    return value.trim() ? value : `[${placeholder}]`;
  };

  // Display fields or placeholders
  const provider = displayField(data.providerName, "SERVICE PROVIDER NAME");
  const providerJurisdiction = displayField(data.providerJurisdiction, "JURISDICTION");
  const providerAddress = displayField(data.providerAddress, "ADDRESS");
  const customer = displayField(data.customerName, "CUSTOMER NAME");
  const customerJurisdiction = displayField(data.customerJurisdiction, "JURISDICTION");
  const customerAddress = displayField(data.customerAddress, "ADDRESS");
  const effectiveDate = displayField(data.effectiveDate, "DATE");
  const uptime = displayField(data.uptime, "99.9");
  const inferenceLatency = displayField(data.inferenceLatency, "200");
  const requestThroughput = displayField(data.requestThroughput, "1000 per minute");
  const concurrentUsers = displayField(data.concurrentUsers, "500");
  const modelAccuracy = displayField(data.modelAccuracy, "95");
  const qualityScore = displayField(data.qualityScore, "4.5 out of 5");
  const contentSafety = displayField(data.contentSafety, "99");
  const securityAssessment = displayField(data.securityAssessment, "quarterly");
  const securityPatchTime = displayField(data.securityPatchTime, "24 hours");
  const incidentNotificationTime = displayField(data.incidentNotificationTime, "4 hours");
  const systemUpdateFrequency = displayField(data.systemUpdateFrequency, "monthly");
  const updateNotificationTime = displayField(data.updateNotificationTime, "7 days");
  const maintenanceHours = displayField(data.maintenanceHours, "4");
  const supportEmail = displayField(data.supportEmail, "EMAIL ADDRESS");
  const supportPhone = displayField(data.supportPhone, "PHONE NUMBER");
  const supportWebPortal = displayField(data.supportWebPortal, "URL");
  const supportChat = displayField(data.supportChat, "PLATFORM/URL");
  const timezone = displayField(data.timezone, "Eastern Time (ET)");
  const governingLaw = displayField(data.governingLaw, "JURISDICTION");

  return (
    <div className="p-6 font-sans text-sm leading-relaxed">
      <h1 className="text-2xl font-bold text-center mb-4">SERVICE LEVEL AGREEMENT (SLA) FOR AI SYSTEMS</h1>
      
      <p className="mb-4">
        This Service Level Agreement (the "SLA") is entered into as of {effectiveDate} (the "Effective Date"), by and between:
      </p>
      
      <p className="mb-2">
        <strong>{provider}</strong>, a company organized under the laws of {providerJurisdiction}, with its principal place of business at {providerAddress} (the "Service Provider"); and
      </p>
      
      <p className="mb-4">
        <strong>{customer}</strong>, a company organized under the laws of {customerJurisdiction}, with its principal place of business at {customerAddress} (the "Customer").
      </p>
      
      <p className="mb-4">
        Service Provider and Customer may be referred to individually as a "Party" and collectively as the "Parties."
      </p>
      
      <h2 className="text-xl font-bold mt-6 mb-3">1. INTRODUCTION</h2>
      
      <p className="mb-2">1.1 This SLA forms part of the [MASTER SERVICES AGREEMENT/AI MODEL LICENSE AGREEMENT/OTHER AGREEMENT] between the Parties dated [DATE] (the "Principal Agreement").</p>
      
      <p className="mb-2">1.2 This SLA establishes the minimum service levels and performance standards for the artificial intelligence system(s) (the "AI System") provided by Service Provider to Customer, as described in Exhibit A.</p>
      
      <p className="mb-4">1.3 In the event of any conflict between this SLA and the Principal Agreement, the terms of the Principal Agreement shall prevail unless expressly stated otherwise in this SLA.</p>
      
      <h2 className="text-xl font-bold mt-6 mb-3">2. DEFINITIONS</h2>
      
      <p className="mb-2">2.1 Capitalized terms used but not defined in this SLA shall have the meanings given to them in the Principal Agreement.</p>
      
      <p className="mb-4">2.2 In this SLA, the following terms shall have the meanings set out below:</p>
      
      <p className="mb-2"><strong>"API Endpoint"</strong> means the designated interface point through which the AI System can be accessed.</p>
      
      <p className="mb-2"><strong>"Business Hours"</strong> means [TIME PERIOD, e.g., "9:00 AM to 5:00 PM"] in the {timezone} time zone on Business Days.</p>
      
      <p className="mb-2"><strong>"Business Days"</strong> means any day other than a Saturday, Sunday, or public holiday in [LOCATION].</p>
      
      <div className="mb-4">
        <p className="mb-1"><strong>"Defect"</strong> means any error, bug, failure, or malfunction that causes the AI System to fail to conform to the specifications or documentation.</p>
        
        <p className="mb-1"><strong>"Downtime"</strong> means any period during which the AI System is unavailable or inaccessible to Customer, excluding Scheduled Maintenance.</p>
        
        <p className="mb-1"><strong>"Inference Latency"</strong> means the time elapsed between when a request is received by the AI System and when the corresponding response is provided.</p>
        
        <p className="mb-1"><strong>"Model Accuracy"</strong> means the percentage of correct predictions or responses generated by the AI System compared to a predefined benchmark or ground truth.</p>
        
        <p className="mb-1"><strong>"Monthly Uptime Percentage"</strong> means the percentage of time within a calendar month during which the AI System is available, calculated as: (Total Minutes in the Month - Downtime) ÷ (Total Minutes in the Month) × 100.</p>
        
        <p className="mb-1"><strong>"Quality Score"</strong> means a composite score that measures the overall quality of the AI System's outputs based on predefined criteria.</p>
        
        <p className="mb-1"><strong>"Response Time"</strong> means the elapsed time between Customer's submission of a support request and Service Provider's initial response to such request.</p>
        
        <p className="mb-1"><strong>"Resolution Time"</strong> means the elapsed time between Customer's submission of a support request and Service Provider's resolution of the issue.</p>
        
        <p className="mb-1"><strong>"Scheduled Maintenance"</strong> means planned maintenance activities performed by Service Provider on the AI System, which may result in temporary unavailability of the AI System.</p>
        
        <p className="mb-1"><strong>"Security Incident"</strong> means any actual or reasonably suspected unauthorized access, use, disclosure, modification, or destruction of Customer Data.</p>
        
        <p className="mb-1"><strong>"Service Credits"</strong> means the credits issued to Customer as compensation for Service Provider's failure to meet the Service Levels, as specified in Section 6.</p>
        
        <p className="mb-1"><strong>"Service Levels"</strong> means the performance standards and metrics specified in Section 4 of this SLA.</p>
        
        <p className="mb-1"><strong>"Support Levels"</strong> means the different tiers of support provided by Service Provider, as described in Section 5 of this SLA.</p>
        
        <p className="mb-1"><strong>"System Update"</strong> means any update, patch, or new version of the AI System that is made available to Customer.</p>
      </div>
      
      <h2 className="text-xl font-bold mt-6 mb-3">3. SERVICE SCOPE</h2>
      
      <p className="mb-2">3.1 <strong>Services Covered</strong>. This SLA covers the following services provided by Service Provider:</p>
      
      <p className="mb-1 ml-6">(a) Access to and use of the AI System as specified in Exhibit A;</p>
      <p className="mb-1 ml-6">(b) Technical support for the AI System;</p>
      <p className="mb-1 ml-6">(c) Maintenance and updates of the AI System;</p>
      <p className="mb-1 ml-6">(d) Security monitoring and incident response; and</p>
      <p className="mb-4 ml-6">(e) Performance monitoring and reporting.</p>
      
      <p className="mb-2">3.2 <strong>Services Not Covered</strong>. This SLA does not cover:</p>
      
      <p className="mb-1 ml-6">(a) Issues resulting from Customer's equipment, software, or network connections;</p>
      <p className="mb-1 ml-6">(b) Issues resulting from Customer's unauthorized modifications of the AI System;</p>
      <p className="mb-1 ml-6">(c) Issues resulting from Customer's use of the AI System in violation of the Principal Agreement;</p>
      <p className="mb-1 ml-6">(d) Issues resulting from Force Majeure events as defined in the Principal Agreement; or</p>
      <p className="mb-4 ml-6">(e) Any services not expressly included in Section 3.1.</p>
      
      <h2 className="text-xl font-bold mt-6 mb-3">4. SERVICE LEVELS</h2>
      
      <p className="mb-4">4.1 <strong>Availability</strong>. Service Provider guarantees that the AI System will achieve a Monthly Uptime Percentage of at least {uptime}% during each calendar month.</p>
      
      <p className="mb-2">4.2 <strong>Performance</strong>. Service Provider guarantees the following performance metrics for the AI System:</p>
      
      <p className="mb-1 ml-6">(a) <strong>Inference Latency</strong>: The AI System will maintain an average Inference Latency of no more than {inferenceLatency} milliseconds for [PERCENTAGE]% of requests within a calendar month.</p>
      <p className="mb-1 ml-6">(b) <strong>Request Throughput</strong>: The AI System will support up to {requestThroughput} without degradation in performance.</p>
      <p className="mb-4 ml-6">(c) <strong>Concurrent Users</strong>: The AI System will support up to {concurrentUsers} concurrent users without degradation in performance.</p>
      
      <p className="mb-2">4.3 <strong>Quality</strong>. Service Provider guarantees the following quality metrics for the AI System:</p>
      
      <p className="mb-1 ml-6">(a) <strong>Model Accuracy</strong>: The AI System will maintain a minimum Model Accuracy of {modelAccuracy}% as measured against the benchmark described in Exhibit B.</p>
      <p className="mb-1 ml-6">(b) <strong>Quality Score</strong>: The AI System will maintain a minimum Quality Score of {qualityScore} as defined in Exhibit B.</p>
      <p className="mb-4 ml-6">(c) <strong>Content Safety</strong>: The AI System will block or flag {contentSafety}% of harmful or prohibited content as defined in Exhibit B.</p>
      
      <p className="mb-2">4.4 <strong>Security</strong>. Service Provider will:</p>
      
      <p className="mb-1 ml-6">(a) Maintain ISO 27001 certification or equivalent security standards;</p>
      <p className="mb-1 ml-6">(b) Perform security assessments of the AI System at least {securityAssessment};</p>
      <p className="mb-1 ml-6">(c) Implement security patches for critical vulnerabilities within {securityPatchTime} of discovery; and</p>
      <p className="mb-4 ml-6">(d) Notify Customer of any Security Incident within {incidentNotificationTime} of discovery.</p>
      
      <p className="mb-2">4.5 <strong>System Updates</strong>. Service Provider will:</p>
      
      <p className="mb-1 ml-6">(a) Provide System Updates at least {systemUpdateFrequency};</p>
      <p className="mb-1 ml-6">(b) Notify Customer at least {updateNotificationTime} in advance of any System Update that may materially affect the functionality of the AI System;</p>
      <p className="mb-1 ml-6">(c) Schedule Scheduled Maintenance during off-peak hours whenever possible; and</p>
      <p className="mb-4 ml-6">(d) Limit Scheduled Maintenance to no more than {maintenanceHours} hours per month.</p>
      
      <p className="mb-2">4.6 <strong>Reporting</strong>. Service Provider will:</p>
      
      <p className="mb-1 ml-6">(a) Provide Customer with monthly reports on the performance of the AI System against the Service Levels;</p>
      <p className="mb-1 ml-6">(b) Make real-time performance metrics available through a dashboard accessible to Customer; and</p>
      <p className="mb-4 ml-6">(c) Notify Customer promptly of any failure to meet the Service Levels.</p>
      
      <h2 className="text-xl font-bold mt-6 mb-3">5. SUPPORT SERVICES</h2>
      
      <p className="mb-2">5.1 <strong>Support Channels</strong>. Service Provider will provide support through the following channels:</p>
      
      <p className="mb-1 ml-6">(a) Email: {supportEmail}</p>
      <p className="mb-1 ml-6">(b) Phone: {supportPhone}</p>
      <p className="mb-1 ml-6">(c) Web Portal: {supportWebPortal}</p>
      <p className="mb-4 ml-6">(d) Chat: {supportChat}</p>
      
      <p className="mb-2">5.2 <strong>Support Hours</strong>. Service Provider will provide support during the following hours:</p>
      
      <p className="mb-1 ml-6">(a) <strong>Standard Support</strong>: Business Hours</p>
      <p className="mb-1 ml-6">(b) <strong>Extended Support</strong>: [HOURS, e.g., "7:00 AM to 10:00 PM"] in the {timezone} time zone on Business Days</p>
      <p className="mb-4 ml-6">(c) <strong>Premium Support</strong>: 24 hours a day, 7 days a week</p>
      
      <p className="mb-2">5.3 <strong>Support Levels</strong>. Service Provider will provide the following Support Levels:</p>
      
      <p className="mb-1 ml-6">(a) <strong>Level 1 (Critical)</strong>: Issues that render the AI System completely inoperative or cause a severe impact on Customer's operations.</p>
      <p className="mb-1 ml-6">(b) <strong>Level 2 (High)</strong>: Issues that significantly impair the functionality of the AI System but do not prevent its overall operation.</p>
      <p className="mb-1 ml-6">(c) <strong>Level 3 (Medium)</strong>: Issues that cause minor impairment to the AI System's functionality.</p>
      <p className="mb-4 ml-6">(d) <strong>Level 4 (Low)</strong>: General questions, feature requests, or issues that do not impact the AI System's functionality.</p>
      
      <p className="mb-4">5.4 <strong>Response and Resolution Times</strong>. Service Provider will respond to and resolve support requests within the timeframes specified in Exhibit C.</p>
      
      <p className="mb-4">5.5 <strong>Escalation Procedures</strong>. If Customer believes that a support request is not being addressed in accordance with this SLA, Customer may escalate the request according to the escalation procedures set forth in Exhibit C.</p>
      
      <h2 className="text-xl font-bold mt-6 mb-3">6. SERVICE CREDITS</h2>
      
      <p className="mb-4">6.1 <strong>Credit Calculation</strong>. If Service Provider fails to meet any of the Service Levels in a calendar month, Customer shall be entitled to receive Service Credits as specified in Exhibit D.</p>
      
      <p className="mb-4">6.2 <strong>Maximum Credits</strong>. The aggregate maximum amount of Service Credits to be issued by Service Provider to Customer for all failures to meet Service Levels in a single calendar month shall not exceed [PERCENTAGE]% of the monthly fees paid by Customer for that calendar month.</p>
      
      <p className="mb-4">6.3 <strong>Credit Request Process</strong>. To receive Service Credits, Customer must submit a claim to Service Provider within [NUMBER] days after the end of the month in which the failure occurred. Service Provider shall approve or reject the claim within [NUMBER] days after receipt. If approved, Service Credits will be applied to Customer's next invoice.</p>
      
      <p className="mb-4">6.4 <strong>Sole Remedy</strong>. Service Credits shall be Customer's sole and exclusive remedy for any failure by Service Provider to meet the Service Levels, except for failures resulting from Service Provider's gross negligence or willful misconduct.</p>
      
      <h2 className="text-xl font-bold mt-6 mb-3">7. AI-SPECIFIC CONSIDERATIONS</h2>
      
      <p className="mb-2">7.1 <strong>Model Drift Monitoring</strong>. Service Provider shall monitor the AI System for model drift and shall retrain or update the AI System if model drift exceeds [THRESHOLD].</p>
      
      <p className="mb-2">7.2 <strong>Bias Detection and Mitigation</strong>. Service Provider shall implement processes to detect and mitigate bias in the AI System's outputs and shall report on bias metrics as part of the regular performance reports.</p>
      
      <p className="mb-2">7.3 <strong>Explainability</strong>. Service Provider shall provide explanation mechanisms for the AI System's decisions to the extent technically feasible and as specified in Exhibit A.</p>
      
      <p className="mb-2">7.4 <strong>Data Privacy and Security</strong>. Service Provider shall comply with all applicable data privacy and security laws and regulations in its operation of the AI System.</p>
      
      <p className="mb-2">7.5 <strong>Ethical Use Guidelines</strong>. Service Provider shall enforce ethical use guidelines for the AI System as specified in Exhibit D.</p>
      
      <p className="mb-4">7.6 <strong>System Testing and Validation</strong>. Service Provider shall conduct regular testing and validation of the AI System to ensure compliance with the specifications and Service Levels.</p>
      
      <h2 className="text-xl font-bold mt-6 mb-3">8. GOVERNANCE AND REVIEW</h2>
      
      <p className="mb-2">8.1 <strong>SLA Review</strong>. The Parties shall review this SLA at least [FREQUENCY, e.g., "annually"] to assess its effectiveness and make any necessary adjustments.</p>
      
      <p className="mb-2">8.2 <strong>Performance Reviews</strong>. The Parties shall conduct performance reviews at least [FREQUENCY, e.g., "quarterly"] to discuss the AI System's performance against the Service Levels.</p>
      
      <p className="mb-2">8.3 <strong>Continuous Improvement</strong>. Service Provider shall implement a continuous improvement program for the AI System and shall provide Customer with a roadmap for future enhancements and improvements.</p>
      
      <p className="mb-4">8.4 <strong>Change Management</strong>. Any changes to this SLA shall be managed through the change management process specified in the Principal Agreement.</p>
      
      <h2 className="text-xl font-bold mt-6 mb-3">9. GENERAL PROVISIONS</h2>
      
      <p className="mb-2">9.1 <strong>Term</strong>. This SLA shall commence on the Effective Date and shall continue for the duration of the Principal Agreement, unless terminated earlier in accordance with the terms of the Principal Agreement.</p>
      
      <p className="mb-2">9.2 <strong>Modifications</strong>. This SLA may only be modified by a written amendment signed by authorized representatives of both Parties.</p>
      
      <p className="mb-2">9.3 <strong>Governing Law</strong>. This SLA shall be governed by and construed in accordance with the laws of {governingLaw}, without regard to its conflict of laws principles.</p>
      
      <p className="mb-4">9.4 <strong>Entire Agreement</strong>. This SLA, together with the Principal Agreement, constitutes the entire agreement between the Parties with respect to the subject matter and supersedes all prior or contemporaneous communications, representations, or agreements, whether oral or written.</p>
      
      <p className="mt-8 mb-6">IN WITNESS WHEREOF, the Parties have executed this SLA as of the Effective Date.</p>
      
      <div className="mb-8">
        <p className="mb-2"><strong>{provider}</strong></p>
        <p className="mb-1">By: ___________________________</p>
        <p className="mb-1">Name: _________________________</p>
        <p className="mb-1">Title: __________________________</p>
        <p className="mb-4">Date: __________________________</p>
        
        <p className="mb-2"><strong>{customer}</strong></p>
        <p className="mb-1">By: ___________________________</p>
        <p className="mb-1">Name: _________________________</p>
        <p className="mb-1">Title: __________________________</p>
        <p className="mb-1">Date: __________________________</p>
      </div>
      
      <h2 className="text-xl font-bold mt-6 mb-3">EXHIBIT A: AI SYSTEM DESCRIPTION</h2>
      <p className="mb-4 italic">[Detailed description of the AI System including architecture, functionality, APIs, interfaces, deployment model, and requirements]</p>
      
      <h2 className="text-xl font-bold mt-6 mb-3">EXHIBIT B: MEASUREMENT METHODOLOGY</h2>
      <p className="mb-4 italic">[Description of methodology for measuring each Service Level metric including tools, frequency, formulas, benchmarks, and reporting mechanisms]</p>
      
      <h2 className="text-xl font-bold mt-6 mb-3">EXHIBIT C: ESCALATION PROCEDURES</h2>
      <p className="mb-4 italic">[Outline of escalation procedures for support issues including contacts, timeframes, and communication protocols]</p>
      
      <h2 className="text-xl font-bold mt-6 mb-3">EXHIBIT D: ETHICAL USE GUIDELINES</h2>
      <p className="mb-4 italic">[Guidelines for ethical use of the AI System including prohibited uses, content moderation standards, and oversight mechanisms]</p>
    </div>
  );
};

export default SlaDocument;
