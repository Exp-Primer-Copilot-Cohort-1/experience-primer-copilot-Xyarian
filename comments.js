// Create web server
const app = express();
const port = 3000;

// Use pug as view engine
app.set('view engine', 'pug');

// Use static files
app.use(express.static('public'));

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Use cookie parser
app.use(cookieParser());

// Use express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Use flash
app.use(flash());

// Use passport
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(function(req, res, next) {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/nodekb', { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Load models
require('./models/Article');
require('./models/User');

// Load routes
const index = require('./routes/index');
const articles = require('./routes/articles');
const users = require('./routes/users');
const comments = require('./routes/comments');

// Use routes
app.use('/', index);
app.use('/articles', articles);
app.use('/users', users);
app.use('/comments', comments);

// Start server
app.listen(port, () => console.log(`Server started on port ${port}...`));