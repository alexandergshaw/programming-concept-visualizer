import { Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ConceptWrapper from '../../common/ConceptWrapper';
import Timeline, { TimelineStep } from '../../common/Timeline';
import Section from '../../common/Section';

const timelineSteps: TimelineStep[] = [
    {
        icon: <DescriptionIcon fontSize="small" />,
        content: (
            <>
                <Typography variant="h6">Define Requirements</Typography>
                <Typography>Write detailed user stories and acceptance criteria.</Typography>
            </>
        ),
    },
    {
        icon: <ChecklistIcon fontSize="small" />,
        content: (
            <>
                <Typography variant="h6">Create Test Cases</Typography>
                <Typography>Each story becomes testable with expected outcomes.</Typography>
            </>
        ),
    },
    {
        icon: <PlayCircleIcon fontSize="small" />,
        content: (
            <>
                <Typography variant="h6">Execute Tests</Typography>
                <Typography>Real users simulate real-world use of the system.</Typography>
            </>
        ),
    },
    {
        icon: <FeedbackIcon fontSize="small" />,
        content: (
            <>
                <Typography variant="h6">Collect Feedback</Typography>
                <Typography>If bugs are found, fix them and cycle back to test again.</Typography>
            </>
        ),
    },
    {
        icon: <CheckCircleIcon fontSize="small" />,
        content: (
            <>
                <Typography variant="h6">Sign Off</Typography>
                <Typography>Finalize approval and move to production.</Typography>
            </>
        ),
    },
];


export default function UserAcceptanceTestingConcept() {
    return (
        <>
            <ConceptWrapper title={"User Acceptance Testing (UAT)"} description={"The final check to make sure an application works for real users in the real world. It’s like taking a car for a test drive before buying—if everything runs smoothly and meets expectations, it's ready to launch."}>
                <Section title={'Steps in UAT'}>
                    <Timeline steps={timelineSteps} />
                </Section>
            </ConceptWrapper>
            <ConceptWrapper title={"Demo"} description={"The final check to make sure an application works for real users in the real world. It’s like taking a car for a test drive before buying—if everything runs smoothly and meets expectations, it's ready to launch."}>
                <></>
            </ConceptWrapper>
        </>

    )
}