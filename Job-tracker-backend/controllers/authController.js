const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createToken = (id) => jwt.sign({id},process.env.JWT_SECRET,{expiresIn: '3d'});

exports.register = async(req,res) => {
    try{
        const { email, password } = req.body;

        console.log('[REGISTER] Attempting to register:', email); // ✅ debug log
    
        const hash = await bcrypt.hash(password, 10);
        
        console.log('[DEBUG] User model loaded:', User);
        const user = await User.create({ email, password: hash });
    
        console.log('[REGISTER] User created:', user); // ✅ debug log
        
        const token = createToken(user._id);
    
        console.log('[REGISTER] Token created:', token); // ✅ debug log
    
        res.json({ token, email: user.email });
    } catch(err){
        console.error('[REGISTER ERROR]', err); // Log the full error
        res.status(400).json({ error: err.message || 'Something went wrong' }); // Show actual message
    }
};


exports.login = async(req,res) => {
    try {

        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user) return res.status(400).json({error:'User Not found'});

        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({error: 'Invalid credentials'});

        const token = createToken(user._id);
        res.json({token,email:user.email});
        
    } catch (err) {
        res.status(500).json({error:'Server error'});
    }

};

