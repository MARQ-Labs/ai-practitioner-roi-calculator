
import React from 'react';

interface NdaFormData {
  partyAName: string;
  partyAJurisdiction: string;
  partyAAddress: string;
  partyBName: string;
  partyBJurisdiction: string;
  partyBAddress: string;
  effectiveDate: string;
  purpose: string;
  term: string;
  survivalPeriod: string;
  governingLaw: string;
  disputeResolution: string;
}

interface NdaDocumentProps {
  data: NdaFormData;
}

const NdaDocument: React.FC<NdaDocumentProps> = ({ data }) => {
  const {
    partyAName,
    partyAJurisdiction,
    partyAAddress,
    partyBName,
    partyBJurisdiction,
    partyBAddress,
    effectiveDate,
    purpose,
    term,
    survivalPeriod,
    governingLaw,
    disputeResolution
  } = data;

  return (
    <div className="p-8 mx-auto max-w-4xl font-serif">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold uppercase tracking-wider">NON-DISCLOSURE AGREEMENT</h1>
      </div>

      <div className="mb-8">
        <p className="mb-4">
          This Non-Disclosure Agreement (the "Agreement") is entered into as of{' '}
          <span className="font-semibold underline">{effectiveDate || '[DATE]'}</span>{' '}
          (the "Effective Date"), by and between:
        </p>

        <p className="mb-4">
          <strong>{partyAName || '[PARTY A NAME]'}</strong>, a company organized under the laws of{' '}
          <span className="font-semibold">{partyAJurisdiction || '[JURISDICTION]'}</span>, with its principal place of business at{' '}
          <span className="font-semibold">{partyAAddress || '[ADDRESS]'}</span> ("Party A"); and
        </p>

        <p className="mb-4">
          <strong>{partyBName || '[PARTY B NAME]'}</strong>, a company organized under the laws of{' '}
          <span className="font-semibold">{partyBJurisdiction || '[JURISDICTION]'}</span>, with its principal place of business at{' '}
          <span className="font-semibold">{partyBAddress || '[ADDRESS]'}</span> ("Party B").
        </p>

        <p>Party A and Party B may be referred to individually as a "Party" and collectively as the "Parties."</p>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">1. PURPOSE</h2>
        <p>
          The Parties wish to explore a potential business relationship concerning{' '}
          <span className="font-semibold">{purpose || '[DESCRIBE PURPOSE]'}</span> (the "Purpose"). 
          In connection with the Purpose, each Party may disclose to the other certain confidential and proprietary information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">2. DEFINITION OF CONFIDENTIAL INFORMATION</h2>
        
        <p className="mb-3">
          2.1 <strong>"Confidential Information"</strong> means any non-public information disclosed by one Party (the "Disclosing Party") to the other Party (the "Receiving Party"), either directly or indirectly, in writing, orally, or by inspection of tangible objects, which is designated as "Confidential," "Proprietary," or some similar designation, or that should reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure.
        </p>
        
        <p className="mb-3">
          2.2 <strong>AI-Specific Confidential Information</strong>. Confidential Information includes, but is not limited to:
        </p>
        <div className="ml-5 mb-3">
          <p>(a) AI algorithms, models, and methodologies;</p>
          <p>(b) Training data and datasets;</p>
          <p>(c) Model parameters, hyperparameters, and weights;</p>
          <p>(d) Technical specifications and architectures;</p>
          <p>(e) Performance metrics and benchmarks;</p>
          <p>(f) Research findings and experimental results;</p>
          <p>(g) Source code and programming interfaces;</p>
          <p>(h) Business plans and strategies related to AI deployment;</p>
          <p>(i) Information about data collection and processing methods; and</p>
          <p>(j) Any other proprietary information related to artificial intelligence systems.</p>
        </div>
        
        <p className="mb-3">
          2.3 <strong>Exclusions</strong>. Confidential Information does not include information that:
        </p>
        <div className="ml-5 mb-3">
          <p>(a) was in the Receiving Party's possession prior to disclosure by the Disclosing Party;</p>
          <p>(b) is or becomes publicly available through no fault of the Receiving Party;</p>
          <p>(c) is rightfully received by the Receiving Party from a third party without restriction;</p>
          <p>(d) is independently developed by the Receiving Party without use of or reference to the Disclosing Party's Confidential Information; or</p>
          <p>(e) is approved for release by written authorization of the Disclosing Party.</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">3. OBLIGATIONS OF RECEIVING PARTY</h2>
        
        <p className="mb-3">
          3.1 <strong>Non-Disclosure</strong>. The Receiving Party shall:
        </p>
        <div className="ml-5 mb-3">
          <p>(a) maintain the confidentiality of the Disclosing Party's Confidential Information with at least the same degree of care it uses to protect its own confidential information, but no less than a reasonable degree of care;</p>
          <p>(b) not disclose any Confidential Information to any person or entity other than its employees, consultants, and agents who (i) have a need to know such information for the Purpose, (ii) are informed of the confidential nature of the information, and (iii) are bound by confidentiality obligations at least as restrictive as those contained in this Agreement; and</p>
          <p>(c) be responsible for any breach of this Agreement by its employees, consultants, and agents.</p>
        </div>
        
        <p className="mb-3">
          3.2 <strong>Use Limitation</strong>. The Receiving Party shall use the Confidential Information solely for the Purpose and shall not use the Confidential Information for any other purpose, including but not limited to:
        </p>
        <div className="ml-5 mb-3">
          <p>(a) reverse engineering, decompiling, or disassembling any disclosed AI models or algorithms;</p>
          <p>(b) using disclosed training data to train competing AI systems; or</p>
          <p>(c) using the Confidential Information to develop competing products or services.</p>
        </div>
        
        <p className="mb-3">
          3.3 <strong>Required Disclosure</strong>. If the Receiving Party is required by law, court order, or governmental authority to disclose Confidential Information, the Receiving Party shall:
        </p>
        <div className="ml-5 mb-3">
          <p>(a) provide prompt written notice to the Disclosing Party (if legally permissible);</p>
          <p>(b) cooperate with the Disclosing Party's efforts to obtain a protective order or other remedy; and</p>
          <p>(c) disclose only that portion of Confidential Information that is legally required to be disclosed.</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">4. RETURN OR DESTRUCTION OF MATERIALS</h2>
        
        <p className="mb-3">
          4.1 Upon the earlier of (a) completion of the Purpose, (b) termination of the business relationship, or (c) written request from the Disclosing Party, the Receiving Party shall:
        </p>
        <div className="ml-5 mb-3">
          <p>(a) return all tangible materials containing Confidential Information to the Disclosing Party;</p>
          <p>(b) permanently delete or destroy all electronic copies of Confidential Information; and</p>
          <p>(c) certify in writing that all Confidential Information has been returned, deleted, or destroyed.</p>
        </div>
        
        <p className="mb-3">
          4.2 <strong>Special Provisions for AI Models</strong>. If Confidential Information has been used to train or fine-tune AI models:
        </p>
        <div className="ml-5 mb-3">
          <p>(a) the Receiving Party shall provide documentation of steps taken to remove the influence of the Confidential Information from such models; and</p>
          <p>(b) if complete removal is technically unfeasible, the Parties shall agree on appropriate restrictions for the use of such models.</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">5. NO RIGHTS OR LICENSES</h2>
        
        <p className="mb-2">5.1 All Confidential Information remains the property of the Disclosing Party.</p>
        
        <p className="mb-2">5.2 No license or other rights to Confidential Information are granted to the Receiving Party by this Agreement, whether expressly, by implication, estoppel, or otherwise.</p>
        
        <p>5.3 The Disclosing Party warrants that it has the right to disclose the Confidential Information to the Receiving Party but makes no other warranties, express or implied.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">6. TERM AND TERMINATION</h2>
        
        <p className="mb-2">
          6.1 This Agreement shall commence on the Effective Date and continue for a period of{' '}
          <span className="font-semibold">{term || '[TERM]'}</span> years (the "Term"), unless terminated earlier by mutual written agreement of the Parties.
        </p>
        
        <p className="mb-2">
          6.2 The confidentiality obligations under this Agreement shall survive the expiration or termination of this Agreement for a period of{' '}
          <span className="font-semibold">{survivalPeriod || '[SURVIVAL PERIOD]'}</span> years.
        </p>
        
        <p>6.3 Notwithstanding Section 6.2, the confidentiality obligations for trade secrets shall continue for as long as such information remains a trade secret under applicable law.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">7. REMEDIES</h2>
        
        <p className="mb-2">7.1 The Receiving Party acknowledges that any breach of this Agreement may cause irreparable harm to the Disclosing Party for which monetary damages may be inadequate.</p>
        
        <p>7.2 In the event of a breach or threatened breach of this Agreement, the Disclosing Party shall be entitled to seek injunctive relief, in addition to any other remedies available at law or in equity.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">8. GENERAL PROVISIONS</h2>
        
        <p className="mb-2">8.1 <strong>Relationship of Parties</strong>. This Agreement does not create any agency, partnership, joint venture, or other business relationship between the Parties.</p>
        
        <p className="mb-2">8.2 <strong>No Obligation</strong>. Nothing in this Agreement obligates either Party to proceed with any transaction between them, and each Party reserves the right to terminate discussions at any time.</p>
        
        <p className="mb-2">8.3 <strong>No Warranty</strong>. ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS." THE DISCLOSING PARTY MAKES NO WARRANTIES, EXPRESS, IMPLIED, OR OTHERWISE, REGARDING THE ACCURACY, COMPLETENESS, OR PERFORMANCE OF ANY CONFIDENTIAL INFORMATION.</p>
        
        <p className="mb-2">
          8.4 <strong>Governing Law</strong>. This Agreement shall be governed by and construed in accordance with the laws of{' '}
          <span className="font-semibold">{governingLaw || '[JURISDICTION]'}</span>, without regard to its conflict of laws principles.
        </p>
        
        <p className="mb-2">
          8.5 <strong>Dispute Resolution</strong>. Any dispute arising out of or in connection with this Agreement shall be resolved{' '}
          <span className="font-semibold">{disputeResolution || '[SPECIFY DISPUTE RESOLUTION METHOD]'}</span>.
        </p>
        
        <p className="mb-2">8.6 <strong>Entire Agreement</strong>. This Agreement constitutes the entire agreement between the Parties with respect to the subject matter and supersedes all prior or contemporaneous communications, representations, or agreements.</p>
        
        <p className="mb-2">8.7 <strong>Amendments</strong>. This Agreement may only be modified by a written amendment signed by authorized representatives of both Parties.</p>
        
        <p className="mb-2">8.8 <strong>Severability</strong>. If any provision of this Agreement is found to be unenforceable, the remaining provisions shall remain in full force and effect.</p>
        
        <p className="mb-2">8.9 <strong>Waiver</strong>. No failure or delay by either Party in exercising any right under this Agreement shall constitute a waiver of that right.</p>
        
        <p className="mb-2">8.10 <strong>Notices</strong>. All notices must be in writing and delivered by hand, certified mail, or overnight courier to the addresses specified in this Agreement, or by email with confirmation of receipt.</p>
        
        <p className="mb-2">8.11 <strong>Assignment</strong>. Neither Party may assign this Agreement without the prior written consent of the other Party.</p>
        
        <p>8.12 <strong>Counterparts</strong>. This Agreement may be executed in counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument.</p>
      </section>

      <section className="mt-12">
        <p className="text-center mb-6">IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.</p>
        
        <div className="grid grid-cols-2 gap-12 mt-8">
          <div>
            <p className="font-bold mb-6">{partyAName || '[PARTY A NAME]'}</p>
            <p className="mb-2">By: ___________________________</p>
            <p className="mb-2">Name: _________________________</p>
            <p className="mb-2">Title: __________________________</p>
            <p>Date: __________________________</p>
          </div>
          
          <div>
            <p className="font-bold mb-6">{partyBName || '[PARTY B NAME]'}</p>
            <p className="mb-2">By: ___________________________</p>
            <p className="mb-2">Name: _________________________</p>
            <p className="mb-2">Title: __________________________</p>
            <p>Date: __________________________</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NdaDocument;
