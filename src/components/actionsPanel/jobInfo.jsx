import { useRecoilValue } from "recoil";
import { recoilJobMode } from "../../state/actions.state";

const JobInfo = () => {

    const jobMode = useRecoilValue(recoilJobMode);
    
    return (
        <div className="job-info">
            <div className="job-info__inner">
                {jobMode === 'plan' &&
                    <>
                        <div>0 acres selected</div>
                        <div>Estimated time</div>
                        <div>Estimated cycles</div>
                    </>
                }
                {jobMode === 'fly' &&
                    <div className="job-info__fly">
                        <div className="job-info__complete">
                            <p className="job-info__complete-title">Completed</p>
                            <p>X acres of Y </p>
                        </div>
                        <div className="job-info__percentage">0%</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default JobInfo;
