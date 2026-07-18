import React from 'react';
import { Modal, Button } from 'drew-io';

export const Confirm = () => (
  <div style={{ position: 'relative', minHeight: 380 }}>
    <Modal
      open
      kicker="ERR / confirm"
      title="Erase the record."
      footer={<><Button variant="ghost">Dismiss</Button><Button variant="danger">Erase</Button></>}
    >
      This deletes every record this station has ever kept. Bad news is factual: there is no undo.
    </Modal>
  </div>
);
