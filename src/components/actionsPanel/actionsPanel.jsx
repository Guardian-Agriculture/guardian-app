import { useRecoilState, useRecoilValue } from "recoil";
import ActionsPanelHeader from "./header";
import Zones from "./zones";

import './actionsPanel.scss';
import JobActions from "./jobActions";
import JobInfo from "./jobInfo";

import { recoilZones, recoilActionsPanelOpen } from '../../state/actions.state';
import ZoneControls from "./zoneControls";
import { useEffect } from "react";

const ActionsPanel = () => {
    const zones = useRecoilValue(recoilZones);
    const [actionsPanelOpen, setActionsPanelOpen] = useRecoilState(recoilActionsPanelOpen);

    useEffect(() => {
        setActionsPanelOpen(zones.length > 0);
    }, []);

    return (
        <>
            <ActionsPanelHeader />
            <div className={`actions-panel ${actionsPanelOpen ? 'actions-panel--open' : ''}`}>
                <div className="actions-panel__inner">
                    <div className="actions-panel__top">
                        <JobInfo />
                        <Zones />
                    </div>
                    <div className="actions-panel__bottom">
                        <JobActions />
                    </div>
                </div>
                <div className="actions-panel__zone-controls">
                    <ZoneControls />
                </div>
            </div>
        </>
    )
}

export default ActionsPanel;
