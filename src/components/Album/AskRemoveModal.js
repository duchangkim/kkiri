import React from 'react';
import AskModal from '../common/askModal';

const AskRemoveModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <AskModal
      visible={visible}
      title="파일 삭제"
      description="파일을 정말 삭제하시겠습니까?"
      confirmText="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskRemoveModal;
