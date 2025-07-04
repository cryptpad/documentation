Accessibility
==============

CryptPad is committed to achieving compliance with the Web Content Accessibility Guidelines (WCAG). The development team understands the importance of creating a usable and inclusive experience and is actively working to meet the WCAG 2.1 AA standard. To check on the details and status of this work please see the `Accessibility project on GitHub <https://github.com/orgs/cryptpad/projects/5>`__.

Feedback channels
-----------------

We welcome contributions that make CryptPad more accessible. User feedback is crucial to identifying issues and use-cases, and of course we also appreciate code patches to solve these problems. Please get in touch through the following channels:

- `Email <mailto:a11y@cryptpad.org>`__
- `CryptPad Forum <https://forum.cryptpad.org/t/accessibility>`__
- `Matrix chat <https://matrix.to/#/#cryptpad-accessibility:matrix.xwiki.com>`__
- `GitHub issues <https://github.com/cryptpad/cryptpad/issues/new/choose>`__

Accessibility Features
----------------------

Below are some key accessibility features currently implemented or in progress:

- **Keyboard Navigation**: Interactive elements can be accessed and used via keyboard.
- **Focus Indicators**: Clear and visible focus indicators are present.
- **Screen Reader Support**: We are actively working to improve compatibility with screen readers.
- **Responsive Design**: We do our best to create interfaces that adapt to various devices and screen sizes.

Third-Party Content and Limitations
-----------------------------------

While CryptPad strives to make all aspects of its platform fully accessible, there may be limitations in third-party content or services that we integrate. These third-party components may not always fully meet the same WCAG 2.1 AA standards. Please check their documentation for more details:

CryptPad integrates with the following third-party apps:

- `CodeMirror <https://codemirror.net/>`_
- `Drawio <https://www.drawio.com/doc/>`_
- `CKEditor4 <https://ckeditor.com/docs/ckeditor4/latest/guide/dev_a11y.html>`_
- `OnlyOffice <https://helpcenter.onlyoffice.com/ONLYOFFICE-Editors/Editors-User-Guides/AllEditors/Accessibility.aspx>`_

Known Issues
------------

We keep track of issues we know about in the `Accessibility project <https://github.com/orgs/cryptpad/projects/5>`_. These include:

- Potential keyboard traps when interacting with third-party applications.
- Screen reader compatibility issues.
- Limited responsiveness for mobile usage.
- Lack of descriptive error messages across the app.

Assessment Approach
-------------------

CryptPad utilizes a combination of external and self-evaluation methods to verify progress towards accessibility goals.

- **External Audits**:

  - NGI Report, Teams audit [April 2020].
  - a11ylab [March 2021]: `View Table <http://ux.a11ylab.com/table/cryptpad>`_.
  - HAN audit [August 2024]: `List of Issues <https://github.com/cryptpad/cryptpad/issues?page=1&q=+is%3Aissue+label%3A%22HAN+scan+08-24%22>`_.
