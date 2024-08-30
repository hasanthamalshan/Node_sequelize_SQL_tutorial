const sequelize = require('./database');
const User = require('./models/User');
const Profile = require('./models/Profile');
const Post = require('./models/Post');
const Group = require('./models/Group');
const express = require('express');

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


sequelize.sync().then(() => {
  console.log('Database & tables created!');
});


app.post('/users', async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  });

app.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.update(req.body);
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

app.post('/users/:userId/profile', async (req, res) => {
    const { userId } = req.params;
    const { bio } = req.body;
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const profile = await Profile.create({ bio, userId: user.id });
      res.status(201).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findByPk(userId, {
        include: Profile
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.post('/users/:userId/posts', async (req, res) => {
    const { userId } = req.params;
    const { title, content } = req.body;
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const post = await Post.create({ title, content, userId: user.id });
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.get('/users/:userId/posts', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findByPk(userId, {
        include: Post
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.post('/users/:userId/groups/:groupId', async (req, res) => {
    const { userId, groupId } = req.params;
  
    try {
      const user = await User.findByPk(userId);
      const group = await Group.findByPk(groupId);
  
      if (!user || !group) {
        return res.status(404).json({ error: 'User or Group not found' });
      }
  
      await user.addGroup(group);
      res.status(201).json({ message: 'User added to group' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.get('/users/:userId/groups', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findByPk(userId, {
        include: Group
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.get('/users/:userId/groups', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findByPk(userId, {
        include: Group
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
app.get('/groups/:groupId/users', async (req, res) => {
    const { groupId } = req.params;
  
    try {
      const group = await Group.findByPk(groupId, {
        include: User
      });
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
      res.json(group);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  
  
  
  
  
  
  
  