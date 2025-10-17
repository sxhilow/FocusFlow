// Sahil is responsible for this logic

export const getSession = async (req, res) => {
    res.send('get session')
}

export const startSession = async (req, res) => {
    res.send('start session')
}

export const stopSession = async (req, res) => {
    res.send('stop session')
}

export const sessionCommitment = async (req, res) => {
    res.send("Commitment")
}

export const sessionReflection = async (req, res) => {
    res.send("Reflection")
}



