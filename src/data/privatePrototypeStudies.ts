export type PrototypeStudy = {slug:string; name:string; title:string; intro:string; evidence:string; limits:string; steps:string[]; layers:string[][]; validation:string; image:string; mobileImage:string}
export const privatePrototypeOrigin = "https://portfolio-prototypes-20261101.pawar-d-parth.chatgpt.site"
export const privatePrototypeStudies: Record<string,PrototypeStudy> = {
  "code-for-build": {
    "name": "Code for Build",
    "title": "Build a page, then inspect the code",
    "intro": "A new working browser adaptation of the original phone-first block grammar. Add and edit blocks, change their order, inspect the source-derived anatomy, and export a real HTML page.",
    "evidence": "Original block grammar, code/output pair, phone screens and process maps from the project archive.",
    "limits": "The exported page is working HTML/CSS. It is not a recovered version of the original app, a Dart runtime, or evidence of improved learning outcomes.",
    "steps": [
      "Edit the selected heading, then apply the edit and inspect Output.",
      "Add, reorder or remove a block. Compare Code and Structure; try Undo and Redo.",
      "Export HTML to run the page separately, or save and reopen the project JSON."
    ],
    "layers": [
      [
        "Compose",
        "Add and order page blocks",
        "Validated document model",
        "No hosted publishing service",
        "Undo or restore a saved project"
      ],
      [
        "Inspect",
        "Compare output, code and anatomy",
        "Generated HTML in a sandbox",
        "No arbitrary code execution service",
        "Escape learner text and reject unsafe import IDs"
      ],
      [
        "Save",
        "Export HTML or project JSON",
        "Project-specific local storage",
        "No cloud account",
        "Download the project; recover malformed imports"
      ]
    ],
    "validation": "Ask a first-time learner to predict what reordering two blocks will change, build the result, then reopen the saved project. Record comprehension and recovery without treating task execution as a learning outcome.",
    "slug": "code-for-build",
    "image": "/Assets/Projects/prototype-studies-2026/code-for-build-desktop.png",
    "mobileImage": "/Assets/Projects/prototype-studies-2026/code-for-build-mobile.png"
  },
  "vj-software": {
    "name": "VJ Parivar",
    "title": "Choose two spaces and recover the record",
    "intro": "A working parking rehearsal based on the original map-first selection flow. Compare spaces, choose one car bay and one two-wheeler bay, review a demo hold and simulate a payment response.",
    "evidence": "Original wing/floor selection, parking map, vehicle filters, payment and post-booking record.",
    "limits": "The schematic plan, availability, price and payment outcomes are fixtures. A demo receipt creates no real booking, ownership or parking entitlement.",
    "steps": [
      "Choose a wing/floor and a car bay, then switch vehicle type and choose a two-wheeler bay.",
      "Review both spaces, acknowledge the demo boundary and try a failed response before retrying.",
      "Confirm the demo allocation, inspect the saved record and download its receipt."
    ],
    "layers": [
      [
        "Choose",
        "Inspect bay dimensions and type",
        "Fixture plan plus selected bay IDs",
        "No live society inventory",
        "Choose another floor or clear filters"
      ],
      [
        "Review",
        "Check the two-space allocation",
        "Five-minute local demo hold",
        "No real reservation or payment provider",
        "Keep choices after a failed response; renew an expired hold"
      ],
      [
        "Record",
        "Confirm and inspect the receipt",
        "One allocation per hold; local inventory exclusion",
        "No legal document or ownership system",
        "Retrieve the saved demo record"
      ]
    ],
    "validation": "Test whether residents can explain the chosen location, dimensions and commitment before confirming. Include an unavailable space, expired hold and failed payment. The source archive does not establish allocation fairness or usability results.",
    "slug": "vj-software",
    "image": "/Assets/Projects/prototype-studies-2026/vj-software-desktop.png",
    "mobileImage": "/Assets/Projects/prototype-studies-2026/vj-software-mobile.png"
  },
  "transfi-project": {
    "name": "TransFi",
    "title": "Follow an invoice-linked business payout",
    "intro": "A 2026 B2B extension focused on invoice-linked business payouts: recipient, quote, approval and tracking. It is separate from the original merchant-onboarding and crypto-payment design record.",
    "evidence": "Original TransFi brand and merchant interface evidence, plus the current official B2B trade-payment documentation for an invoice-linked payout sequence.",
    "limits": "Recipients, rates, fees, balances, approval roles and settlement events are fixtures. Role switching rehearses approval; it is not authentication or authorization. No KYB, bank, supplier-validation or provider integration is connected.",
    "steps": [
      "Use a sample supplier and invoice reference to generate a demo quote.",
      "Submit as the payment maker. Switch to the demo reviewer to approve the request.",
      "Simulate failure and retry settlement, then inspect the event history, balance and receipt."
    ],
    "layers": [
      [
        "Prepare",
        "Choose a sample supplier and invoice",
        "Project-specific local request",
        "No provider recipient or KYB API",
        "Reject missing invoice or invalid amount"
      ],
      [
        "Review",
        "Inspect principal, fee and recipient amount",
        "Quote expires after 60 seconds",
        "No current FX or production fee quote",
        "Create a fresh request when the quote expires"
      ],
      [
        "Approve",
        "Separate maker from reviewer",
        "Local role rehearsal and event history",
        "No real authorization system",
        "Block maker self-approval in the model"
      ],
      [
        "Track",
        "Simulate failure or settlement",
        "Atomic one-time demo debit and receipt",
        "No bank or provider callback",
        "Failure leaves the balance unchanged"
      ]
    ],
    "validation": "Test whether a finance operator can explain the invoice, total debit, recipient amount and next owner of the request. Include expiry, insufficient balance, self-approval and provider-failure recovery.",
    "slug": "transfi-project",
    "image": "/Assets/Projects/prototype-studies-2026/transfi-project-desktop.png",
    "mobileImage": "/Assets/Projects/prototype-studies-2026/transfi-project-mobile.png"
  },
  "zentipay": {
    "name": "ZentiPay",
    "title": "Review the token transfer before confirming",
    "intro": "A new working adaptation of the original centred token-transfer screen. The recipient, token, balance and invoice remain connected through review, a simulated settlement and a persistent transfer record.",
    "evidence": "Original send-crypto screen, completed-transfer invoice, wallet overview and transaction history from the project archive.",
    "limits": "USDT amounts use fixed two-decimal fixtures, not token-network precision or a live exchange quote. Contacts are fictional. No wallet, chain, email, identity or payment provider is connected.",
    "steps": [
      "Choose a fixture wallet contact and enter a demo token amount.",
      "Review the recipient amount, illustrative fee and total before confirming the request.",
      "Simulate settlement or failure, then inspect history and download the demo receipt."
    ],
    "layers": [
      [
        "Prepare",
        "Select a fixture recipient and amount",
        "Local token-transfer draft",
        "No real wallet address or network lookup",
        "Reject invalid amounts"
      ],
      [
        "Review",
        "Keep amount and fee together",
        "Expiring demo quote",
        "No current token price or network fee",
        "Edit details or request a new quote"
      ],
      [
        "Settle",
        "Simulate the provider response",
        "One-time local debit only on success",
        "No blockchain transaction",
        "Failure preserves the demo balance"
      ],
      [
        "Recover",
        "Retrieve the transfer record",
        "Persistent local ledger and receipt",
        "No emailed invoice",
        "Download the receipt; retain history after reload"
      ]
    ],
    "validation": "Ask users to explain the token, recipient and total debit before confirmation. Test a failed settlement and retrieval of the correct receipt; do not infer financial trust or transfer performance from software checks.",
    "slug": "zentipay",
    "image": "/Assets/Projects/prototype-studies-2026/zentipay-desktop.png",
    "mobileImage": "/Assets/Projects/prototype-studies-2026/zentipay-mobile.png"
  },
  "medimorpho": {
    "name": "NYU Langone",
    "title": "Rehearse communication across a visit",
    "intro": "A provisional, nonclinical browser concept informed by the project’s language-and-navigation research topic. Prepare a sample communication card, make a staff/interpreter handoff explicit and check next-step understanding.",
    "evidence": "The public research framing covers language and navigation before, during and after a healthcare visit. Original research, findings and participant material remain reserved for private review.",
    "limits": "This is not the hospital’s patient portal or a validated care service. It gives no medical advice, clinical translation, appointment booking or care plan, and uses no patient records. Interpreter availability is simulated.",
    "steps": [
      "Choose a communication language, indicate an interpreter preference and use a sample question.",
      "Rehearse an unavailable service, then a staff-confirmed handoff. The app does not contact anyone.",
      "Confirm the two nonclinical next-step prompts and download the sample communication card."
    ],
    "layers": [
      [
        "Prepare",
        "Record a preference and sample question",
        "Local communication card",
        "No patient or appointment system",
        "Explain the sample-data boundary before input"
      ],
      [
        "Handoff",
        "Make the requested assistance visible",
        "Requested, unavailable or staff-confirmed demo status",
        "No interpreter dispatch or automated clinical translation",
        "Keep the request visible and ask staff about qualified assistance"
      ],
      [
        "Understand",
        "Rehearse next-step comprehension",
        "Two conversation prompts",
        "No clinical instructions or validated care plan",
        "Return to the staff conversation when a step is unclear"
      ]
    ],
    "validation": "Review with appropriate clinical, language-access and accessibility professionals before any patient-facing use. Test comprehension and handoff continuity without inventing participant outcomes or clinical benefit.",
    "slug": "medimorpho",
    "image": "/Assets/Projects/prototype-studies-2026/medimorpho-desktop.png",
    "mobileImage": "/Assets/Projects/prototype-studies-2026/medimorpho-mobile.png"
  }
}
export const privatePrototypeStudy = (slug:string) => privatePrototypeStudies[slug]
