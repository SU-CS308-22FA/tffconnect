import { API_URL } from "app/constants";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Card, Stack, IconButton, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import useAuth from 'app/hooks/useAuth';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';


const MatchDetail = () => {
    const [openCommentModal, setOpenCommentModal] = useState(false);
    const [openFlagModal, setOpenFlagModal] = useState(false);
    const [matchToFlag, setMatchToFlag] = useState(null);
    const [match, setMatch] = useState({
        id: 0,
        referee_id: 0,
        game_name: "",
        game_date: "",
        game_result: ""
    });
    const [comments, setComments] = useState([]);

    const { user } = useAuth()
    const matchId = useParams().id;

    const getMatch = () => {
        axios.get(API_URL + '/games/' + matchId)
        .then((response) => {
            setMatch(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const getComments = () => {
        axios.get(API_URL + '/games/' + matchId + '/comments/', {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('accessToken')
            }
        })
        .then((response) => {
            setComments(response.data.reverse());
        }
        )
        .catch((error) => {
            console.error(error);
        }
        );
    }

    const handleClickOpenCommentModal = () => {
        setOpenCommentModal(true);
    };

    const handleCloseCommentModal = () => {
        setOpenCommentModal(false);
    };

    const handleSubmitComment = () => {
        axios.post(API_URL + '/games/' + matchId + '/comments/', {
            comment: document.getElementById('comment').value
        }, {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('accessToken')
            }
        })
        document.getElementById('comment').value = "";
        handleCloseCommentModal();
    }

    const handleDeleteComment = (commentId) => {
        axios.delete(API_URL + '/games/' + matchId + '/comments/' + commentId + '/', {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('accessToken')
            }
        })
        .then((response) => {
            getComments();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const handleClickOpenFlagModal = (matchId) => {
        setMatchToFlag(matchId);
        setOpenFlagModal(true);
    };

    const handleCloseFlagModal = () => {
        setMatchToFlag(null);
        setOpenFlagModal(false);
    };

    const handleFlagComment = () => {
        axios.patch(API_URL + '/games/' + matchId + '/comments/' + matchToFlag + '/', {
            is_reported: true
        }, {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('accessToken')
            }
        })
        .then((response) => {
            handleCloseFlagModal();
            getComments();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getMatch();
        getComments();
    }, [matchId, openCommentModal]);

    return (
        <div align="center">
            <Card variant="outlined" sx={{ width: 500, height: 290, margin: 2, padding: 2 }}>
                <h1>{match.game_name}</h1>
                <h1>{match.game_date}</h1>
                <h1>Skor:</h1>
                <h1>{match.game_result}</h1>
            </Card>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{display: 'inline'}}>Yorumlar</h1>
                <IconButton onClick={handleClickOpenCommentModal}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </div>
            <Dialog open={openCommentModal} onClose={handleCloseCommentModal}>
                <DialogTitle>Yorum Ekle</DialogTitle>
                <DialogContent sx={{width: 500}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="comment"
                        label="Yorumunuz"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCommentModal}>Iptal</Button>
                    <Button type='submit' onClick={handleSubmitComment}>Ekle</Button>
                </DialogActions>
            </Dialog>
            <Stack spacing={1} sx={{ marginBottom: 2 }}>
                {comments.map((item, index) => (
                    <Card variant="outlined" sx={{ width: 500}} key={index} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <p>{item.user_full_name}: {item.comment}</p>
                        {
                            (() => {
                                if (item.user === user.id) {
                                    return (
                                        <IconButton onClick={() => handleDeleteComment(item.id)}>
                                            <RemoveCircleOutlineIcon/>
                                        </IconButton>
                                    )
                                } else {
                                    if (item.is_reported) {
                                        return (
                                            <IconButton disabled>
                                                <FlagCircleIcon color="error"/>
                                            </IconButton>
                                        )
                                    } else 
                                        return (
                                            <IconButton onClick={() => handleClickOpenFlagModal(item.id)}>
                                                <FlagCircleIcon/>
                                            </IconButton>
                                        )
                                }
                            })()
                        }
                    </Card>
                ))}
            </Stack>
            <Dialog open={openFlagModal} onClose={handleCloseFlagModal}>
                <DialogTitle>Yorumu Rapor Et</DialogTitle>
                <DialogContent sx={{width: 500}}>
                    Yorumu rapor etmek istediginize emin misiniz?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFlagModal}>Iptal</Button>
                    <Button type='submit' onClick={() => handleFlagComment(matchToFlag)}>Evet</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default MatchDetail;
