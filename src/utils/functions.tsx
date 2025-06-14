import { CheckCircle, Error, Warning } from "@mui/icons-material";

export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'full': return 'error';
        case 'almost full': return 'warning';
        case 'empty': return 'success';
        default: return 'default';
    }
};

export const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
        case 'full': return <Error />;
        case 'almost full': return <Warning />;
        case 'empty': return <CheckCircle />;
        default: return <CheckCircle />;
    }
};