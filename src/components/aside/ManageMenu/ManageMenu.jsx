import './ManageMenu.css';
import { useEffect, useState } from 'react';
import useManage from "../../../hooks/useManage";
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../../../hooks/useIsMobile';
import LoadingModal from '../../LoadingModal/LoadingModal';

function ManageMenu() {
  const {
    selectedUser,
    selectedRole,
    isModify,
    inputId,
    handleRoleChange,
    handleStudentIdChange,
    handleClickModifyBtn,
    isManageLoading
  } =  useManage();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMobileManageOpen, setIsMobileManageOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileManageOpen(true);
    }
    if (isMobile && selectedUser.selected) {
      setIsMobileManageOpen(true);
    }else if (isMobile && !selectedUser.selected){
      setIsMobileManageOpen(false);
    }
  }, [isMobile, selectedUser]);

  return (
    <section className='aside-user-manage'>
      <LoadingModal show={isManageLoading} />
      <h2 className='aside-user-manage-title'
        onClick={() => {
          if (!selectedUser.selected) {
            alert('해당 사용자의 오른쪽 화살표를 누르세요.');
          }
          if( isMobileManageOpen && isMobile ) {
            setIsMobileManageOpen(false);
          }
          else if( !isMobileManageOpen && isMobile ) {
            setIsMobileManageOpen(true);
          }
        }}
      >
        사용자 정보
      </h2>
      {isMobileManageOpen && selectedUser.selected && (
        <article className='aside-user-manage-info'>
          <div className='aside-user-manage-role-input'>
            <h5 className="aside-user-manage-input-title">역할</h5>
            <div className="aside-user-manage-ratio-container">
              <div className="aside-user-manage-ratio">
                <input type="radio" id="student" name="role" value="STUDENT" checked={selectedRole == "STUDENT" ? true : false} 
                  onChange={handleRoleChange} disabled={isModify ? false : true} />
                <label htmlFor="student">학생</label>
              </div>
              <div className="aside-user-manage-ratio">
                <input type="radio" id="professor" name="role" value="PROFESSOR" checked={selectedRole == "PROFESSOR" ? true : false}
                  onChange={handleRoleChange} disabled={isModify ? false : true} />
                <label htmlFor="professor">교수자</label>
              </div>
              <div className="aside-user-manage-ratio">
                <input type="radio" id="developer" name="role" value="DEVELOPER" checked={selectedRole == "DEVELOPER" ? true : false}
                  onChange={handleRoleChange} disabled={isModify ? false : true} />
                <label htmlFor="developer">관리자</label>
              </div>
            </div>
          </div>
          <div className='aside-user-manage-id-input'>
            <label htmlFor="student-id">학번</label>
            <input type="text" name="student-id" id='student-id' value={inputId || ""} onChange={handleStudentIdChange} disabled={isModify ? false : true} />
          </div>
          <button className={'aside-user-manage-modify-btn ' + (isModify ? "active" : null)} onClick={handleClickModifyBtn}>
            {
              isModify ? "저장하기" : "정보 수정"
            }
          </button>
          <button className='aside-user-redirect-btn' onClick={() => {
            navigate('/manage/' + selectedUser.studentId);
          }}>챗봇과의 대화기록 보기</button>
          <button className='aside-user-redirect-btn' onClick={() => {
            navigate('/chatstu/' + selectedUser.studentId);
          }}>나와의 대화기록 보기</button>
        </article>
      )}
    </section>
  )
}

export default ManageMenu;