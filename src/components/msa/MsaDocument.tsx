import React from 'react';

interface MsaFormData {
  serviceProviderName: string;
  serviceProviderJurisdiction: string;
  serviceProviderAddress: string;
  clientName: string;
  clientJurisdiction: string;
  clientAddress: string;
  effectiveDate: string;
  paymentTermDays: string;
  terminationNoticeDays: string;
  breachCureDays: string;
  confidentialityYears: string;
  liabilityCap: string;
  governingLaw: string;
  arbitrationBody: string;
  survivingSections: string;
}

interface MsaDocumentProps {
  data: MsaFormData;
}

const MsaDocument: React.FC<MsaDocumentProps> = ({ data }) => {
  return (
    <div className="bg-white p-8 font-sans" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">
          MASTER SERVICES AGREEMENT FOR AI SERVICES
        </h1>
        <p className="text-gray-600 mb-4">
          A comprehensive legal framework for artificial intelligence service engagements
        </p>
      </div>

      <div className="mb-6">
        <p className="mb-4">
          This Master Services Agreement (the "Agreement") is entered into as of {data.effectiveDate || "[DATE]"} 
          (the "Effective Date"), by and between:
        </p>
        
        <p className="mb-4">
          <strong>{data.serviceProviderName || "[SERVICE PROVIDER NAME]"}</strong>, a company organized under 
          the laws of {data.serviceProviderJurisdiction || "[JURISDICTION]"}, with its principal place of business at {data.serviceProviderAddress || "[ADDRESS]"} ("Service Provider"); and
        </p>
        
        <p className="mb-4">
          <strong>{data.clientName || "[CLIENT NAME]"}</strong>, a company organized under the laws of {data.clientJurisdiction || "[JURISDICTION]"}, with its principal place of business at {data.clientAddress || "[ADDRESS]"} ("Client").
        </p>
        
        <p className="mb-4">
          Service Provider and Client may be referred to individually as a "Party" and collectively as the "Parties."
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">1. DEFINITIONS</h2>
        
        <p className="mb-2">1.1 <strong>"AI System"</strong> means any artificial intelligence, machine learning, or algorithmic system, application, or model developed, deployed, or provided by Service Provider under this Agreement.</p>
        
        <p className="mb-2">1.2 <strong>"Confidential Information"</strong> means any non-public information disclosed by one Party to the other, either directly or indirectly, in writing, orally or by inspection of tangible objects, which is designated as "Confidential," "Proprietary," or some similar designation, or that should reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure.</p>
        
        <p className="mb-2">1.3 <strong>"Deliverables"</strong> means all documents, materials, models, software, data, and other items to be delivered to Client as specified in a Statement of Work.</p>
        
        <p className="mb-2">1.4 <strong>"Intellectual Property"</strong> means all patents, inventions, copyrights, trademarks, domain names, trade secrets, know-how and any other intellectual property and/or proprietary rights.</p>
        
        <p className="mb-2">1.5 <strong>"Services"</strong> means the services to be performed by Service Provider as described in each Statement of Work.</p>
        
        <p className="mb-2">1.6 <strong>"Statement of Work" or "SOW"</strong> means a document signed by both Parties describing the Services to be performed, Deliverables, timeline, fees, and other details for a specific project.</p>
        
        <p className="mb-2">1.7 <strong>"Training Data"</strong> means any data used to train, fine-tune, or otherwise develop an AI System.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">2. SERVICES</h2>
        
        <p className="mb-2">2.1 <strong>Service Provider Obligations</strong>. Service Provider shall perform the Services and provide the Deliverables as specified in each SOW. Service Provider will perform the Services in a professional manner in accordance with industry standards and this Agreement.</p>
        
        <p className="mb-2">2.2 <strong>Statements of Work</strong>. The Parties may execute one or more SOWs under this Agreement. Each SOW will be subject to the terms of this Agreement and shall be incorporated herein by reference.</p>
        
        <p className="mb-2">2.3 <strong>Changes to Services</strong>. Any changes to the Services or Deliverables must be agreed upon in writing by both Parties through a formal change request process as outlined in the applicable SOW.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">3. FEES AND PAYMENT</h2>
        
        <p className="mb-2">3.1 <strong>Fees</strong>. Client shall pay the fees as specified in each SOW.</p>
        
        <p className="mb-2">3.2 <strong>Invoicing</strong>. Service Provider shall invoice Client in accordance with the invoicing schedule set forth in the applicable SOW. All undisputed amounts are due within {data.paymentTermDays || "[NUMBER]"} days of receipt of the invoice.</p>
        
        <p className="mb-2">3.3 <strong>Expenses</strong>. Client shall reimburse Service Provider for reasonable out-of-pocket expenses incurred in connection with the Services if approved in advance by Client and upon submission of receipts or other documentation.</p>
        
        <p className="mb-2">3.4 <strong>Taxes</strong>. All fees are exclusive of taxes. Client is responsible for payment of all applicable taxes, except for taxes based on Service Provider's income.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">4. TERM AND TERMINATION</h2>
        
        <p className="mb-2">4.1 <strong>Term</strong>. This Agreement shall commence on the Effective Date and shall continue until terminated as provided herein.</p>
        
        <p className="mb-2">4.2 <strong>Termination for Convenience</strong>. Either Party may terminate this Agreement or any SOW for convenience upon {data.terminationNoticeDays || "[NUMBER]"} days' prior written notice to the other Party.</p>
        
        <p className="mb-2">4.3 <strong>Termination for Cause</strong>. Either Party may terminate this Agreement or any SOW for cause if the other Party materially breaches this Agreement and fails to cure such breach within {data.breachCureDays || "[NUMBER]"} days of receiving written notice of the breach.</p>
        
        <p className="mb-2">4.4 <strong>Effect of Termination</strong>. Upon termination:</p>
        <p className="ml-4 mb-1">(a) Client shall pay Service Provider for all Services performed and expenses incurred up to the date of termination;</p>
        <p className="ml-4 mb-1">(b) Each Party shall return or destroy all Confidential Information of the other Party; and</p>
        <p className="ml-4 mb-1">(c) The provisions of Sections {data.survivingSections || "[LIST SURVIVING SECTIONS]"} shall survive termination.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">5. INTELLECTUAL PROPERTY RIGHTS</h2>
        
        <p className="mb-2">5.1 <strong>Pre-existing IP</strong>. Each Party retains all rights to Intellectual Property owned or licensed by such Party prior to this Agreement or developed outside the scope of this Agreement.</p>
        
        <p className="mb-2">5.2 <strong>Client Materials</strong>. Client owns all right, title, and interest in and to any materials provided by Client to Service Provider.</p>
        
        <p className="mb-2">5.3 <strong>Deliverables</strong>. Unless otherwise specified in the applicable SOW:</p>
        <p className="ml-4 mb-1">(a) Service Provider grants Client a non-exclusive, perpetual, worldwide, royalty-free license to use, modify, and create derivative works of any Service Provider Pre-existing IP that is incorporated into the Deliverables, solely as part of the Deliverables.</p>
        <p className="ml-4 mb-1">(b) Upon full payment, Service Provider assigns to Client all right, title, and interest in and to the Deliverables, excluding any Service Provider Pre-existing IP.</p>
        
        <p className="mb-2">5.4 <strong>AI Models and General Knowledge</strong>. Notwithstanding anything to the contrary:</p>
        <p className="ml-4 mb-1">(a) Service Provider retains ownership of all AI models, algorithms, frameworks, and methodologies used or developed during the provision of Services.</p>
        <p className="ml-4 mb-1">(b) Service Provider may use general knowledge, skills, and experience acquired during the performance of Services, provided that Service Provider does not use or disclose Client's Confidential Information.</p>
        
        <p className="mb-2">5.5 <strong>Training Data</strong>. Unless otherwise specified in the applicable SOW:</p>
        <p className="ml-4 mb-1">(a) Client owns all right, title, and interest in any Client-provided Training Data.</p>
        <p className="ml-4 mb-1">(b) Service Provider owns all right, title, and interest in any Service Provider-provided Training Data.</p>
        <p className="ml-4 mb-1">(c) Service Provider may not use Client-provided Training Data to train models for other clients without Client's express written consent.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">6. CONFIDENTIALITY</h2>
        
        <p className="mb-2">6.1 <strong>Confidentiality Obligations</strong>. Each Party shall:</p>
        <p className="ml-4 mb-1">(a) maintain the confidentiality of the other Party's Confidential Information;</p>
        <p className="ml-4 mb-1">(b) not disclose such Confidential Information to any third party without the prior written consent of the disclosing Party; and</p>
        <p className="ml-4 mb-1">(c) use such Confidential Information only as necessary to fulfill its obligations or exercise its rights under this Agreement.</p>
        
        <p className="mb-2">6.2 <strong>Exceptions</strong>. The obligations in Section 6.1 do not apply to information that:</p>
        <p className="ml-4 mb-1">(a) is or becomes publicly available through no fault of the receiving Party;</p>
        <p className="ml-4 mb-1">(b) was known to the receiving Party prior to disclosure by the disclosing Party;</p>
        <p className="ml-4 mb-1">(c) was independently developed by the receiving Party without use of the disclosing Party's Confidential Information; or</p>
        <p className="ml-4 mb-1">(d) is rightfully obtained by the receiving Party from a third party without restriction.</p>
        
        <p className="mb-2">6.3 <strong>Required Disclosure</strong>. If required by law, the receiving Party may disclose Confidential Information, but shall provide the disclosing Party with prior notice to seek a protective order.</p>
        
        <p className="mb-2">6.4 <strong>Duration</strong>. The confidentiality obligations in this Section shall survive termination of this Agreement for a period of {data.confidentialityYears || "[NUMBER]"} years.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">7. DATA PROTECTION AND SECURITY</h2>
        
        <p className="mb-2">7.1 <strong>Compliance with Laws</strong>. Each Party shall comply with all applicable data protection and privacy laws and regulations.</p>
        
        <p className="mb-2">7.2 <strong>Data Processing Agreement</strong>. If the Services involve the processing of personal data, the Parties shall execute a Data Processing Agreement as an attachment to the applicable SOW.</p>
        
        <p className="mb-2">7.3 <strong>Security Measures</strong>. Service Provider shall implement and maintain appropriate technical, organizational, and physical safeguards to protect Client data in accordance with industry standards and best practices.</p>
        
        <p className="mb-2">7.4 <strong>Security Incident</strong>. Service Provider shall notify Client promptly upon discovery of any unauthorized access, use, or disclosure of Client data and shall take immediate steps to remedy the situation.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">8. WARRANTIES AND DISCLAIMERS</h2>
        
        <p className="mb-2">8.1 <strong>Mutual Warranties</strong>. Each Party warrants that:</p>
        <p className="ml-4 mb-1">(a) it has the full power and authority to enter into this Agreement; and</p>
        <p className="ml-4 mb-1">(b) it shall comply with all applicable laws and regulations in performing its obligations under this Agreement.</p>
        
        <p className="mb-2">8.2 <strong>Service Provider Warranties</strong>. Service Provider warrants that:</p>
        <p className="ml-4 mb-1">(a) the Services will be performed in a professional and workmanlike manner in accordance with industry standards;</p>
        <p className="ml-4 mb-1">(b) to the best of Service Provider's knowledge, the Deliverables will not infringe any third-party Intellectual Property rights; and</p>
        <p className="ml-4 mb-1">(c) Service Provider has the right to grant the licenses and assignments specified in this Agreement.</p>
        
        <p className="mb-2">8.3 <strong>AI System Limitations</strong>. Client acknowledges that:</p>
        <p className="ml-4 mb-1">(a) AI Systems may not be completely accurate, reliable, or error-free;</p>
        <p className="ml-4 mb-1">(b) outputs from AI Systems may require human review and validation; and</p>
        <p className="ml-4 mb-1">(c) the performance of AI Systems depends on the quality and quantity of Training Data.</p>
        
        <p className="mb-2">8.4 <strong>Disclaimer</strong>. EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, EACH PARTY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">9. LIMITATION OF LIABILITY</h2>
        
        <p className="mb-2">9.1 <strong>Exclusion of Damages</strong>. NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT.</p>
        
        <p className="mb-2">9.2 <strong>Liability Cap</strong>. EXCEPT FOR BREACHES OF CONFIDENTIALITY OBLIGATIONS OR INTELLECTUAL PROPERTY RIGHTS, EACH PARTY'S TOTAL CUMULATIVE LIABILITY UNDER THIS AGREEMENT SHALL NOT EXCEED THE GREATER OF: (A) THE TOTAL AMOUNT PAID BY CLIENT TO SERVICE PROVIDER IN THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY OR (B) {data.liabilityCap || "[AMOUNT]"}.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">10. INDEMNIFICATION</h2>
        
        <p className="mb-2">10.1 <strong>Service Provider Indemnification</strong>. Service Provider shall defend, indemnify, and hold harmless Client from and against any third-party claims, actions, or proceedings alleging that the Deliverables infringe any third-party Intellectual Property rights.</p>
        
        <p className="mb-2">10.2 <strong>Client Indemnification</strong>. Client shall defend, indemnify, and hold harmless Service Provider from and against any third-party claims, actions, or proceedings arising from Client-provided materials or Client's use of the Deliverables in violation of this Agreement.</p>
        
        <p className="mb-2">10.3 <strong>Indemnification Procedure</strong>. The indemnified Party shall: (a) promptly notify the indemnifying Party of any claim; (b) give the indemnifying Party sole control of the defense and settlement; and (c) provide reasonable cooperation at the indemnifying Party's expense.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">11. GENERAL PROVISIONS</h2>
        
        <p className="mb-2">11.1 <strong>Independent Contractors</strong>. The Parties are independent contractors. Nothing in this Agreement shall be construed to create a partnership, joint venture, or employment relationship.</p>
        
        <p className="mb-2">11.2 <strong>Assignment</strong>. Neither Party may assign this Agreement without the prior written consent of the other Party, except to an affiliate or a successor in connection with a merger, acquisition, or sale of all or substantially all of its assets.</p>
        
        <p className="mb-2">11.3 <strong>Force Majeure</strong>. Neither Party shall be liable for any failure or delay due to causes beyond its reasonable control, including acts of God, natural disasters, pandemic, war, terrorism, riots, embargoes, or acts of civil or military authorities.</p>
        
        <p className="mb-2">11.4 <strong>Notice</strong>. All notices must be in writing and delivered by hand, certified mail, or overnight courier to the addresses specified in this Agreement, or by email with confirmation of receipt.</p>
        
        <p className="mb-2">11.5 <strong>Governing Law</strong>. This Agreement shall be governed by and construed in accordance with the laws of {data.governingLaw || "[JURISDICTION]"}, without regard to its conflict of laws principles.</p>
        
        <p className="mb-2">11.6 <strong>Dispute Resolution</strong>. Any dispute arising out of or in connection with this Agreement shall first be attempted to be resolved through good faith negotiations. If the dispute cannot be resolved through negotiations, it shall be finally resolved by arbitration in accordance with the rules of {data.arbitrationBody || "[ARBITRATION BODY]"}.</p>
        
        <p className="mb-2">11.7 <strong>Severability</strong>. If any provision of this Agreement is found to be unenforceable, the remaining provisions shall remain in full force and effect.</p>
        
        <p className="mb-2">11.8 <strong>Waiver</strong>. No failure or delay by either Party in exercising any right under this Agreement shall constitute a waiver of that right.</p>
        
        <p className="mb-2">11.9 <strong>Entire Agreement</strong>. This Agreement, including all SOWs, constitutes the entire agreement between the Parties with respect to the subject matter and supersedes all prior or contemporaneous communications, representations, or agreements.</p>
        
        <p className="mb-2">11.10 <strong>Amendments</strong>. This Agreement may only be modified by a written amendment signed by authorized representatives of both Parties.</p>
        
        <p className="mb-2">11.11 <strong>Counterparts</strong>. This Agreement may be executed in counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument.</p>
      </div>

      <div className="mb-6">
        <p className="mb-6">IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.</p>
        
        <div className="grid grid-cols-2 gap-8 mt-4">
          <div>
            <p className="font-semibold mb-4">
              <strong>{data.serviceProviderName || "[SERVICE PROVIDER NAME]"}</strong>
            </p>
            <p className="mb-2">By: ___________________________</p>
            <p className="mb-2">Name: _________________________</p>
            <p className="mb-2">Title: _________________________</p>
            <p className="mb-2">Date: _________________________</p>
          </div>
          <div>
            <p className="font-semibold mb-4">
              <strong>{data.clientName || "[CLIENT NAME]"}</strong>
            </p>
            <p className="mb-2">By: ___________________________</p>
            <p className="mb-2">Name: _________________________</p>
            <p className="mb-2">Title: _________________________</p>
            <p className="mb-2">Date: _________________________</p>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8 pt-4 border-t">
        <p>This Master Services Agreement template is designed for AI service providers | © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default MsaDocument;
