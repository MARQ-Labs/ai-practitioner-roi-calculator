
import React from 'react';

interface DpaFormData {
  controllerName: string;
  controllerJurisdiction: string;
  controllerAddress: string;
  processorName: string;
  processorJurisdiction: string;
  processorAddress: string;
  effectiveDate: string;
  region: string;
  breachNotificationHours: string;
  governingLaw: string;
  subjectMatter: string;
  purpose: string;
  personalDataTypes: string;
  specialCategories: string;
  dataSubjects: string;
  processingOperations: string;
  securityMeasures: string;
}

interface DpaDocumentProps {
  data: DpaFormData;
}

const DpaDocument: React.FC<DpaDocumentProps> = ({ data }) => {
  // Calculate today's date if no effective date is provided
  const displayDate = data.effectiveDate || "[DATE]";
  
  // Replace empty fields with placeholders
  const controller = data.controllerName || "[CONTROLLER NAME]";
  const controllerJurisdiction = data.controllerJurisdiction || "[JURISDICTION]";
  const controllerAddress = data.controllerAddress || "[ADDRESS]";
  
  const processor = data.processorName || "[PROCESSOR NAME]";
  const processorJurisdiction = data.processorJurisdiction || "[JURISDICTION]";
  const processorAddress = data.processorAddress || "[ADDRESS]";
  
  const governingLaw = data.governingLaw || "[JURISDICTION]";
  const region = data.region || "European Economic Area";
  const breachNotificationHours = data.breachNotificationHours || "48";

  return (
    <div className="prose prose-sm max-w-none p-6 font-serif" style={{ fontSize: '11pt' }}>
      <h1 className="text-center text-xl font-bold mb-6">DATA PROCESSING AGREEMENT</h1>
      
      <p>
        This Data Processing Agreement (the "DPA") is entered into as of {displayDate} (the "Effective Date"), by and between:
      </p>
      
      <p>
        <strong>{controller}</strong>, a company organized under the laws of {controllerJurisdiction}, with its principal place of business at {controllerAddress} (the "Controller"); and
      </p>
      
      <p>
        <strong>{processor}</strong>, a company organized under the laws of {processorJurisdiction}, with its principal place of business at {processorAddress} (the "Processor").
      </p>
      
      <p>
        Controller and Processor may be referred to individually as a "Party" and collectively as the "Parties."
      </p>
      
      <h2 className="text-base font-bold mt-6 mb-2">BACKGROUND</h2>
      
      <p>
        A. The Parties have entered into an agreement for the provision of certain artificial intelligence services (the "Services Agreement"), under which Processor will process Personal Data on behalf of Controller.
      </p>
      
      <p>
        B. This DPA sets out the terms and conditions for the processing of Personal Data by Processor on behalf of Controller and supplements the Services Agreement.
      </p>
      
      <p>
        C. This DPA is designed to comply with applicable data protection laws, including but not limited to the European General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other applicable data protection laws (collectively, "Data Protection Laws").
      </p>
      
      <p className="font-bold">
        NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the Parties agree as follows:
      </p>
      
      <h2 className="text-base font-bold mt-6 mb-2">1. DEFINITIONS</h2>
      
      <p>
        1.1 Capitalized terms used but not defined in this DPA shall have the meanings given to them in the Services Agreement or the applicable Data Protection Laws.
      </p>
      
      <p>
        1.2 In this DPA, the following terms shall have the meanings set out below:
      </p>
      
      <p>
        <strong>"Data Subject"</strong> means an identified or identifiable natural person whose Personal Data is processed under this DPA.
      </p>
      
      <p>
        <strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person; an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.
      </p>
      
      <p>
        <strong>"Personal Data Breach"</strong> means a breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to, Personal Data transmitted, stored or otherwise processed.
      </p>
      
      <p>
        <strong>"Process" or "Processing"</strong> means any operation or set of operations which is performed on Personal Data or on sets of Personal Data, whether or not by automated means, such as collection, recording, organization, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction.
      </p>
      
      <p>
        <strong>"Special Categories of Personal Data"</strong> means Personal Data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, or trade union membership, and the processing of genetic data, biometric data for the purpose of uniquely identifying a natural person, data concerning health or data concerning a natural person's sex life or sexual orientation.
      </p>
      
      <p>
        <strong>"Sub-processor"</strong> means any processor engaged by Processor to process Personal Data on behalf of Controller.
      </p>
      
      <p>
        <strong>"Supervisory Authority"</strong> means an independent public authority established pursuant to Data Protection Laws.
      </p>
      
      <h2 className="text-base font-bold mt-6 mb-2">2. SCOPE AND PURPOSE OF PROCESSING</h2>
      
      <p>
        2.1 <strong>Subject Matter and Duration</strong>. The subject matter and duration of the Processing are set out in the Services Agreement. This DPA shall remain in effect for the duration of the Services Agreement and shall automatically terminate upon the termination of the Services Agreement.
      </p>
      
      <p>
        2.2 <strong>Nature and Purpose of Processing</strong>. Processor shall Process Personal Data as necessary to perform the Services, as specified in Annex 1 to this DPA and the Services Agreement, and as further instructed by Controller in writing.
      </p>
      
      <p>
        2.3 <strong>Types of Personal Data and Categories of Data Subjects</strong>. The types of Personal Data and categories of Data Subjects are specified in Annex 1 to this DPA.
      </p>
      
      <h2 className="text-base font-bold mt-6 mb-2">3. OBLIGATIONS OF THE PROCESSOR</h2>
      
      <p>
        3.1 <strong>General Obligations</strong>. Processor shall:
      </p>
      
      <p className="pl-6">
        (a) Process Personal Data only on documented instructions from Controller, including with regard to transfers of Personal Data to a third country or an international organization, unless required to do so by applicable law; in such a case, Processor shall inform Controller of that legal requirement before Processing, unless that law prohibits such information on important grounds of public interest;
      </p>
      
      <p className="pl-6">
        (b) Ensure that persons authorized to Process the Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality;
      </p>
      
      <p className="pl-6">
        (c) Take all measures required pursuant to Article 32 of the GDPR (Security of Processing) and equivalent provisions under other applicable Data Protection Laws;
      </p>
      
      <p className="pl-6">
        (d) Respect the conditions referred to in Sections 3.5 and 3.6 for engaging another processor;
      </p>
      
      <p className="pl-6">
        (e) Taking into account the nature of the Processing, assist Controller by appropriate technical and organizational measures, insofar as this is possible, for the fulfillment of Controller's obligation to respond to requests for exercising the Data Subject's rights under applicable Data Protection Laws;
      </p>
      
      <p className="pl-6">
        (f) Assist Controller in ensuring compliance with the obligations pursuant to Articles 32 to 36 of the GDPR and equivalent provisions under other applicable Data Protection Laws, taking into account the nature of Processing and the information available to Processor;
      </p>
      
      <p className="pl-6">
        (g) At the choice of Controller, delete or return all Personal Data to Controller after the end of the provision of services relating to Processing, and delete existing copies unless applicable law requires storage of the Personal Data;
      </p>
      
      <p className="pl-6">
        (h) Make available to Controller all information necessary to demonstrate compliance with the obligations laid down in this DPA and allow for and contribute to audits, including inspections, conducted by Controller or another auditor mandated by Controller; and
      </p>
      
      <p className="pl-6">
        (i) Immediately inform Controller if, in Processor's opinion, an instruction infringes Data Protection Laws.
      </p>
      
      <p>
        3.2 <strong>AI-Specific Processing Requirements</strong>. When Processing Personal Data in connection with artificial intelligence systems, Processor shall:
      </p>
      
      <p className="pl-6">
        (a) Implement appropriate data minimization techniques to ensure that only necessary Personal Data is used for training, validation, or operation of AI systems;
      </p>
      
      <p className="pl-6">
        (b) Where technically feasible, implement anonymization, pseudonymization, or synthetic data generation techniques to reduce risks to Data Subjects;
      </p>
      
      <p className="pl-6">
        (c) Establish and document procedures for evaluating and mitigating algorithmic bias, discrimination, and unfairness in AI systems processing Personal Data;
      </p>
      
      <p className="pl-6">
        (d) Conduct and document algorithmic impact assessments when processing Special Categories of Personal Data or when Processing may result in high risk to Data Subjects;
      </p>
      
      <p className="pl-6">
        (e) Implement mechanisms to explain AI decision-making processes to the extent technically feasible; and
      </p>
      
      <p className="pl-6">
        (f) Maintain documentation of AI model parameters, hyperparameters, and training methodologies affecting Personal Data Processing.
      </p>
      
      <p>
        3.3 <strong>Personal Data Breach Notification</strong>. Processor shall:
      </p>
      
      <p className="pl-6">
        (a) Notify Controller without undue delay, and in any event within [{breachNotificationHours}] hours, after becoming aware of a Personal Data Breach;
      </p>
      
      <p className="pl-6">
        (b) Provide Controller with sufficient information to allow Controller to meet any obligations to report a Personal Data Breach under Data Protection Laws; and
      </p>
      
      <p className="pl-6">
        (c) Take such measures and actions as are appropriate to remedy or mitigate the effects of the Personal Data Breach and shall keep Controller informed of all developments in connection with the Personal Data Breach.
      </p>
      
      <p>
        3.4 <strong>Data Protection Impact Assessment and Prior Consultation</strong>. Processor shall provide reasonable assistance to Controller with any data protection impact assessments and prior consultations with Supervisory Authorities or other competent data privacy authorities that Controller reasonably considers to be required under Article 35 or 36 of the GDPR or equivalent provisions under other Data Protection Laws.
      </p>
      
      <p>
        3.5 <strong>Sub-processors</strong>. Processor shall not engage another processor (Sub-processor) without prior specific or general written authorization of Controller:
      </p>
      
      <p className="pl-6">
        (a) In the case of general written authorization, Processor shall inform Controller of any intended changes concerning the addition or replacement of Sub-processors, giving Controller the opportunity to object to such changes.
      </p>
      
      <p className="pl-6">
        (b) Where Processor engages a Sub-processor for carrying out specific Processing activities on behalf of Controller, the same data protection obligations as set out in this DPA shall be imposed on that Sub-processor by way of a written contract, in particular providing sufficient guarantees to implement appropriate technical and organizational measures.
      </p>
      
      <p className="pl-6">
        (c) Where a Sub-processor fails to fulfill its data protection obligations, Processor shall remain fully liable to Controller for the performance of that Sub-processor's obligations.
      </p>
      
      <p className="pl-6">
        (d) A current list of Sub-processors is set forth in Annex 2 and shall be updated as necessary to reflect any changes in Sub-processors.
      </p>
      
      <p>
        3.6 <strong>International Transfers</strong>. Processor shall not transfer Personal Data outside the {region} unless:
      </p>
      
      <p className="pl-6">
        (a) The transfer is to a country that the [RELEVANT AUTHORITY, e.g., "European Commission"] has decided provides an adequate level of protection for Personal Data;
      </p>
      
      <p className="pl-6">
        (b) The transfer is subject to appropriate safeguards as set out in Article 46 of the GDPR or equivalent provisions under other Data Protection Laws; or
      </p>
      
      <p className="pl-6">
        (c) Controller has explicitly authorized the transfer and appropriate safeguards are in place.
      </p>
      
      <h2 className="text-base font-bold mt-6 mb-2">4. OBLIGATIONS OF THE CONTROLLER</h2>
      
      <p>
        4.1 Controller shall:
      </p>
      
      <p className="pl-6">
        (a) Ensure that the Processing of Personal Data, including the transfer itself, has been and will continue to be carried out in accordance with Data Protection Laws;
      </p>
      
      <p className="pl-6">
        (b) Provide appropriate documentation and instructions to Processor regarding the Processing of Personal Data;
      </p>
      
      <p className="pl-6">
        (c) Comply with its obligations as a Controller under Data Protection Laws; and
      </p>
      
      <p className="pl-6">
        (d) Be responsible for the accuracy, quality, and legality of Personal Data and the means by which Controller acquired the Personal Data.
      </p>
      
      <h2 className="text-base font-bold mt-6 mb-2">5. LIABILITY AND INDEMNIFICATION</h2>
      
      <p>
        5.1 Each Party shall be liable for and shall indemnify the other Party against all claims, actions, liabilities, losses, damages, and expenses incurred by the indemnified Party which arise directly or indirectly out of the indemnifying Party's Processing of Personal Data under this DPA or breach by the indemnifying Party of its obligations under this DPA.
      </p>
      
      <p>
        5.2 Nothing in this DPA or the Services Agreement shall limit the liability of either Party in connection with:
      </p>
      
      <p className="pl-6">
        (a) Death or personal injury resulting from its negligence or that of its employees or agents;
      </p>
      
      <p className="pl-6">
        (b) Its fraud or fraudulent misrepresentation or that of its employees or agents; or
      </p>
      
      <p className="pl-6">
        (c) Any other liability which cannot be limited or excluded by applicable law.
      </p>
      
      <h2 className="text-base font-bold mt-6 mb-2">6. MISCELLANEOUS</h2>
      
      <p>
        6.1 <strong>Conflict</strong>. In case of conflict between this DPA and the Services Agreement or any other agreements between the Parties, this DPA shall prevail with regard to the Parties' data protection obligations.
      </p>
      
      <p>
        6.2 <strong>Changes in Data Protection Laws</strong>. The Parties agree to negotiate in good faith to amend or supplement this DPA as necessary to comply with changes in Data Protection Laws.
      </p>
      
      <p>
        6.3 <strong>Severability</strong>. If any provision of this DPA is found by any court or administrative body of competent jurisdiction to be invalid or unenforceable, the invalidity or unenforceability of such provision shall not affect any other provision of this DPA, and all provisions not affected by such invalidity or unenforceability shall remain in full force and effect.
      </p>
      
      <p>
        6.4 <strong>Notices</strong>. All notices, requests, demands, or other communications under this DPA shall be in writing and shall be deemed to have been duly given when delivered personally, or three (3) business days after being deposited in the mail, postage prepaid, or one (1) business day after being deposited with an overnight courier, addressed to the Parties at the addresses set forth in the Services Agreement.
      </p>
      
      <p>
        6.5 <strong>Governing Law and Jurisdiction</strong>. This DPA shall be governed by and construed in accordance with the laws of {governingLaw}, without regard to its conflict of laws principles. The Parties submit to the exclusive jurisdiction of the courts of {governingLaw} for any disputes arising out of or in connection with this DPA.
      </p>
      
      <p className="my-6">
        IN WITNESS WHEREOF, the Parties have executed this DPA as of the Effective Date.
      </p>
      
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div>
          <p><strong>{controller}</strong></p>
          <p className="mt-8">By: ___________________________</p>
          <p>Name: _________________________</p>
          <p>Title: __________________________</p>
          <p>Date: __________________________</p>
        </div>
        <div>
          <p><strong>{processor}</strong></p>
          <p className="mt-8">By: ___________________________</p>
          <p>Name: _________________________</p>
          <p>Title: __________________________</p>
          <p>Date: __________________________</p>
        </div>
      </div>
      
      <h2 className="text-base font-bold mt-8 mb-2">ANNEX 1: DETAILS OF PROCESSING</h2>
      
      <p>
        <strong>A. Subject Matter and Duration of Processing</strong><br />
        {data.subjectMatter || "[Describe the subject matter and duration of the Processing activities]"}
      </p>
      
      <p>
        <strong>B. Nature and Purpose of Processing</strong><br />
        {data.purpose || "[Describe the nature and purpose of the Processing activities]"}
      </p>
      
      <p>
        <strong>C. Types of Personal Data</strong><br />
        {data.personalDataTypes || "[List the types of Personal Data to be Processed]"}
      </p>
      
      <p>
        <strong>D. Special Categories of Personal Data (if applicable)</strong><br />
        {data.specialCategories || "None"}
      </p>
      
      <p>
        <strong>E. Categories of Data Subjects</strong><br />
        {data.dataSubjects || "[List the categories of Data Subjects whose Personal Data will be Processed]"}
      </p>
      
      <p>
        <strong>F. Processing Operations</strong><br />
        {data.processingOperations || "[List the Processing operations to be carried out]"}
      </p>
      
      <p>
        <strong>G. Technical and Organizational Security Measures</strong><br />
        {data.securityMeasures || "[Describe the technical and organizational security measures]"}
      </p>
      
      <h2 className="text-base font-bold mt-6 mb-2">ANNEX 2: LIST OF SUB-PROCESSORS</h2>
      
      <p>The following Sub-processors have been approved by Controller:</p>
      
      <table className="border-collapse border border-gray-400 w-full mt-3">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Name of Sub-processor</th>
            <th className="border border-gray-400 p-2">Location</th>
            <th className="border border-gray-400 p-2">Processing Activities</th>
            <th className="border border-gray-400 p-2">Data Protection Safeguards</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 p-2">[Name]</td>
            <td className="border border-gray-400 p-2">[Country]</td>
            <td className="border border-gray-400 p-2">[Activities]</td>
            <td className="border border-gray-400 p-2">[Safeguards]</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2">[Name]</td>
            <td className="border border-gray-400 p-2">[Country]</td>
            <td className="border border-gray-400 p-2">[Activities]</td>
            <td className="border border-gray-400 p-2">[Safeguards]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DpaDocument;
