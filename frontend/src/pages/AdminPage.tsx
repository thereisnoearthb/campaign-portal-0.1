import React from 'react';
import ContentForm from '../components/ContentForm';
import ContentDisplay from '../components/ContentDisplay';

const AdminPage: React.FC = () => {
    return (
        <div>
            <h2>Admin Page</h2>
            <ContentForm />
            <ContentDisplay />
        </div>
    );
};

export default AdminPage;
