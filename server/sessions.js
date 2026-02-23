import crypto from "crypto";

const sessions = {};

export function createSession(role) {
    const sessionId = crypto.randomUUID();

    sessions[sessionId] = {
        role
    };

    return sessionId;
}

export function getSession(sessionId) {
    return sessions[sessionId];
}

export function deleteSession(sessionId) {
    delete sessions[sessionId];
}