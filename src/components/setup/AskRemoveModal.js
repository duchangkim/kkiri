import React from 'react';
import AskModal from '../common/askModal';

const AskRemoveModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <AskModal
      visible={visible}
      title="회원 탈퇴"
      description="회원 탈퇴하시겠습니까?"
      confirmText="탈퇴"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskRemoveModal;