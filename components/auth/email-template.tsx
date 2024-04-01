import * as React from 'react';

interface SendPasswordResetProps {
    resetLink: string;
}

export const SendPasswordResetTemplate: React.FC<Readonly<SendPasswordResetProps>> = ({
    resetLink
}) => (
    <table style={{ width: '100%', backgroundColor: '#FFF3D9', padding: '14px', paddingTop: "20px", height: "100%"}}>
        <tr>
            <td align="center">
                <img src="https://www.sketchlie.com/logo.png" style={{ height: "50px", width: "auto"}}/>
                <span style={{fontSize: '35px', fontWeight: 500, marginBottom: "10px"}}>Sketchlie</span>
                <div style={{ display: 'block', padding: '40px', backgroundColor: '#FFF', borderRadius: '10px', border: '1px solid black', width: '100%', maxWidth: '500px', marginTop: '20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.5em', marginLeft: '4px' }}>Click here to reset your password</p>
                    <div style={{ display: 'block', textAlign: 'center', marginTop: '40px' }}>
                        <a href={resetLink} 
                            style={{
                                border: '1px solid #inputColor',
                                backgroundColor: '#2E4DE6',
                                color: '#fff',
                                padding: '15px',
                                borderRadius: '10px',
                                width: '100%',
                                cursor: 'pointer',
                            }}
                        >
                                Reset Password
                        </a>
                    </div>
                </div>
                <div style={{ display: 'block', paddingTop: '32px', width: '100%', maxWidth: '500px', textAlign: 'center', margin: 'auto'}}>
                    <p>
                        Email sent from resetpassword@sketchlie.com.
                    </p>
                    <p>
                        If you did not request this reset contact contact@sketchlie.com.
                    </p>
                </div>
            </td>
        </tr>
    </table>
);


interface SendOrganizationInviteProps {
    user: any;
    activeOrgName: string;
    dashboardLink: string;
}

export const SendOrganizationInviteTemplate: React.FC<Readonly<SendOrganizationInviteProps>> = ({
    user,
    activeOrgName,
    dashboardLink,
}) => (
    <table style={{ width: '100%', backgroundColor: '#FFF3D9', padding: '14px', paddingTop: "20px", height: "100%" }}>
        <tr>
            <td align="center">
                <img src="https://www.sketchlie.com/logo.png" style={{ height: "50px", width: "auto"}}/>
                <span style={{fontSize: '35px', fontWeight: 500, marginBottom: "10px"}}>Sketchlie</span>
                <div style={{ display: 'block', padding: '40px', backgroundColor: '#FFF', borderRadius: '10px', border: '1px solid black', width: '100%', maxWidth: '500px', marginTop: '20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.5em', marginLeft: '4px' }}>{user.name} has invited you to join {activeOrgName}.</p>
                    <div style={{ display: 'block', textAlign: 'center', marginTop: '40px' }}>
                        <a href={dashboardLink} 
                            style={{
                                border: '1px solid #inputColor',
                                backgroundColor: '#2E4DE6',
                                color: '#fff',
                                padding: '15px',
                                borderRadius: '10px',
                                width: '100%',
                                cursor: 'pointer',
                            }}
                        >
                                Accept Invitation
                        </a>
                    </div>
                </div>
                <div style={{ display: 'block', paddingTop: '32px', width: '100%', maxWidth: '500px', textAlign: 'center', margin: 'auto' }}>
                    <p>
                        Email sent from {user.email}.
                    </p>
                    <p>
                        If you did not request this invitation, please ignore this email.
                    </p>
                </div>
            </td>
        </tr>
    </table>
);

interface SendVerificationEmailProps {
    confirmLink: string;
}

export const SendVerificationEmailTemplate: React.FC<Readonly<SendVerificationEmailProps>> = ({
    confirmLink
}) => (
    <table style={{ width: '100%', backgroundColor: '#FFF3D9', padding: '14px', paddingTop: "20px", height: "100%"}}>
        <tr>
            <td align="center">
                <img src="https://www.sketchlie.com/logo.png" style={{ height: "50px", width: "auto"}}/>
                <span style={{fontSize: '35px', fontWeight: 500, marginBottom: "10px"}}>Sketchlie</span>
                <div style={{ display: 'block', padding: '40px', backgroundColor: '#FFF', borderRadius: '10px', border: '1px solid black', width: '100%', maxWidth: '500px', marginTop: '20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.5em', marginLeft: '4px' }}>Click here to confirm your email</p>
                    <div style={{ display: 'block', textAlign: 'center', marginTop: '40px' }}>
                        <a href={confirmLink} 
                            style={{
                                border: '1px solid #inputColor',
                                backgroundColor: '#2E4DE6',
                                color: '#fff',
                                padding: '15px',
                                borderRadius: '10px',
                                width: '100%',
                                cursor: 'pointer',
                            }}
                        >
                                Confirm email
                        </a>
                    </div>
                </div>
                <div style={{ display: 'block', paddingTop: '32px', width: '100%', maxWidth: '500px', textAlign: 'center', margin: 'auto' }}>
                    <p>
                        Email sent from verification@sketchlie.com.
                    </p>
                    <p>
                        If you did not request this confirmation contact contact@sketchlie.com.
                    </p>
                </div>
            </td>
        </tr>
    </table>
);
