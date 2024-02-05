import ActionsPanelHeader from "./header";
import Zones from "./zones";

import './actionsPanel.scss';
import JobActions from "./jobActions";
import JobInfo from "./jobInfo";
import JobValidation from "./jobValidation";

const ActionsPanel = () => {
    return (
        <>
            <ActionsPanelHeader />
            <div className="actions-panel">
                <div className="actions-panel__inner">
                    <Zones />
                </div>
                <div className="actions-panel__bottom">
                    <JobValidation />
                    <JobInfo />
                    <JobActions />
                </div>
            </div>
        </>
    )
}

export default ActionsPanel;
