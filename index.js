import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/App.css';
import './CSS/RangeSlider.css';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      home: [],
      slides: []
    }
  }
  
  componentDidMount() {
    fetch('https://voda-react-assessment.herokuapp.com/menu')
      .then(response => response.json())
      .then(data => this.setState({ menu: data }));
    fetch('https://voda-react-assessment.herokuapp.com/slider')
      .then(response => response.json())
      .then(data => this.setState({ slides: data }));
    fetch('https://voda-react-assessment.herokuapp.com/home')
      .then(response => response.json())
      .then(data => this.setState({ home: data }));
  }

  render() {
    let myHeader = <Header slides = {this.state.slides} menu = {this.state.menu} />;
    let mySections = <Sections home = {this.state.home} />;
    return(
      <div>
        {myHeader}
        {mySections}
      </div>
    );
  }
}

class Sections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {home: props.home };
  }

  render() {
    let mySection1 = <Section1 home = {this.state.home} />;
    let mySection2 = <Section2 home = {this.state.home} />;
    return(
      <div>
        {mySection1}
        {mySection2}
        <div className={'sections-container'}>
          <div className={'sections-title-container'}>
            <div className={'sections-title'}>Our Sections</div>
          </div>
          <SectionsMenu />
      </div>
    </div>
    )
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.sliderRef0 = React.createRef();
    this.sliderRef1 = React.createRef();
    this.sliderRef2 = React.createRef();
    this.state = {
      slides: [],
      menu: [],
      CurSlider: 'Slider1'
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {slides: props.slides, menu: props.menu};
  }

  toggleSlider = function(index) {
    if(index == 1 && this.state.CurSlider != 'Slider1')
    {
      document.getElementById('slide-option-1').classList.toggle('slide-option-active');
      document.getElementById('slide-1').classList.toggle('');

      if(this.state.CurSlider == 'Slider2')
      {
        document.getElementById('slide-option-2').classList.toggle('slide-option-active');
        document.getElementById('slide-2').classList.toggle('');
      }
      else
      {
        document.getElementById('slide-option-3').classList.toggle('slide-option-active');
        document.getElementById('slide-3').classList.toggle('');
      }

      this.setState({CurSlider: 'Slider1'});
    }
    else if(index == 2 && this.state.CurSlider != 'Slider2')
    {
      document.getElementById('slide-option-2').classList.toggle('slide-option-active');
      document.getElementById('slide-2').classList.toggle('');

      if(this.state.CurSlider == 'Slider1')
      {
        document.getElementById('slide-option-1').classList.toggle('slide-option-active');
        document.getElementById('slide-1').classList.toggle('');
      }
      else
      {
        document.getElementById('slide-option-3').classList.toggle('slide-option-active');
        document.getElementById('slide-3').classList.toggle('');
      }

      this.setState({CurSlider: 'Slider2'});
    }
    else if(index == 3 && this.state.CurSlider != 'Slider3')
    {
      document.getElementById('slide-option-3').classList.toggle('slide-option-active');
      document.getElementById('slide-3').classList.toggle('');

      if(this.state.CurSlider == 'Slider2')
      {
        document.getElementById('slide-option-2').classList.toggle('slide-option-active');
        document.getElementById('slide-2').classList.toggle('');
      }
      else
      {
        document.getElementById('slide-option-1').classList.toggle('slide-option-active');
        document.getElementById('slide-1').classList.toggle('');
      }

      this.setState({CurSlider: 'Slider3'});
    }
  }

  render() {
    return(
      <div className={'slider-section'}>
        <div className={'slider-content'}>
          {this.state.slides.map((slide, index) =>
            <div id={'slide-' + index}>
              <img className={'slide-image'} src={slide.image} />
              <div className={'slide-title'}>{slide.title}</div>
              <div className={'slide-description'}>{slide.subtitle}</div>
            </div>
          )}
          <div className={'page-menu'}>
              {this.state.menu.map((menu, index) =>
                <div id={'Menu-option-' + index} className={'menu-option'}><div>{menu.title}</div><br/><span class="dot"></span></div>
              )}
          </div>
          <div className={'slider-menu'} ><span id='slide-option-1' className="slider-dot" onClick={() => this.toggleSlider(1)}></span><span id='slide-option-2' className="slider-dot" onClick={() => this.toggleSlider(2)}></span><span id='slide-option-3' className="slider-dot" onClick={() => this.toggleSlider(3)}></span></div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    document.getElementById('slide-option-1').classList.toggle('slide-option-active');
    //document.getElementById('slide-1').classList.toggle('Active-Slide');
  }
}

class Section1 extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          home: [],
      };
  }

  static getDerivedStateFromProps(props, state) {
      return {home: props.home };
  }

  imageHover = function(index) {
      document.getElementById('hoverable_' + index).classList.toggle('Hovered-Image');
  }

  render() {
      return(
          <div id='Section1' className={'images-container'}>
              {this.state.home.map(
                  home => home.sections.slice(0,1).map(
                  section => section.images.map(
                      (image, index) => 
                      <div>
                          <img 
                              className={'menu-image-' + index} 
                              id={'hoverable_' + index}
                              onMouseOver={() => this.imageHover(index)}
                              onMouseLeave={() => this.imageHover(index)}
                              src={image.img}
                          />
                          <div className={'image-cover-' + index}>
                              <img className={'eye-icon'}src={require('./IMAGES/eye.png')} />
                              <div className={'image-cover-title'}>{image.title}</div>
                          </div>
                      </div>
                  )
                  )
              )}
          </div>
      )
  }
}

class Section2 extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          home: [],
          stat1: 60,
          stat2: 20,
          stat3: 5,
          stat4: 25,
          phone: '',
          email: '',
          password: '',
          alertmsg: ''
      };
  }

  static getDerivedStateFromProps(props, state) {
      return {home: props.home };
  }

  SubmitHandler = (event) => {
    event.preventDefault();
    var validInput = true;

    if(this.state.phone.length == 10)
    {
      if(!(this.state.phone.charAt(0) == '6' || this.state.phone.charAt(0) == '2'))
      {
        validInput = false;
        let error = this.state.alertmsg + ' phone must begin with 6 or 2.'
        this.setState({alertmsg: error})
        alert(error);
      }
    }
    else if(this.state.phone.length < 10)
    {
      validInput = false;
      let error = this.state.alertmsg + ' phone must not be less than 10 digits.'
      this.setState({alertmsg: error})
      alert(error);
    }
    else
    {
      if(!(this.state.phone.charAt(0) == '+'))
      {
        validInput = false;
        let error = this.state.alertmsg + ' country code must start with +.'
        this.setState({alertmsg: error})
        alert(error);
      }
      else if(!(this.state.phone.charAt(this.state.phone.length - 10) == '6' || this.state.phone.charAt(this.state.phone.length - 10) == '2' ))
      {
        validInput = false;
        let error = this.state.alertmsg + ' phone number must begin with 6 or 2.'
        this.setState({alertmsg: error})
        alert(error);
      }
    }

    let regex = new RegExp("^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$");
    
    if(regex.exec(this.state.email) == null)
    {
      validInput = false;
      let error = this.state.alertmsg + ' invalid email form.'
      this.setState({alertmsg: error})
      alert(error);
    }

    regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/

    if(regex.exec(this.state.password) == null)
    {
      validInput = false;
      let error = this.state.alertmsg + ' password must contain at least a capital, a lower case letter, a number, a symbol and must be more than 8 characters long.'
      this.setState({alertmsg: error})
      alert(error);
    }

    if(validInput)
    {
      alert('ok');
    }

    this.setState({alertmsg: ''});
    
    //alert("You are submitting " + this.state.phone + this.state.email + this.state.password);
  }

  ChangeHandler = (event) => {
  let name = event.target.name;
  let value = event.target.value;
  this.setState({[name]: value});
  }

  onInput(index) {
  var input = document.getElementById("myRange" + index);
  var currentVal = input.value;
  var name = 'stat' + index;
  this.setState({
    [name]: currentVal
  })
  }

  render() {
    return(
        <div id='Section2' className={'section2-container'}>
            {this.state.home.map(home => home.sections.slice(1).map(section => <h4>{section.title}</h4>))}
            <div className={'section2-right'}>  
                <div className={'form-title'}>{this.state.home.map(home => home.sections.slice(1).map(section => section.formText))}</div>
                <div className={'form-subtitle'}>We work with ecosystem leaders, corporations and startups worldwide. How can we help you?</div>
                <form className={'form'} onSubmit={this.SubmitHandler}>
                    <input name='phone' onChange={this.ChangeHandler} placeholder={this.state.home.map(home => home.sections.slice(1).map(section => section.formLabels.slice(0,1).map(label => label)))}></input>
                    <input name='email' onChange={this.ChangeHandler} placeholder={this.state.home.map(home => home.sections.slice(1).map(section => section.formLabels.slice(1,2).map(label => label)))}></input>
                    <input name='password' onChange={this.ChangeHandler} placeholder={this.state.home.map(home => home.sections.slice(1).map(section => section.formLabels.slice(2).map(label => label)))}></input>
                    <button type='submit'>Submit</button>
                </form>
            </div>

            <div className={'section2-left'}>
                <div className={'stats-subtitle'}>{this.state.home.map(home => home.sections.slice(1).map(section => section.graphText))}</div>
                <table>
                    <tr>
                        <span>{this.state.home.map(home => home.sections.slice(1).map(section => section.stats.slice(0,1).map(stat => stat.title)))}</span>
                        <div id="statValue1" className={'statValues'} >{this.state.stat1 + '%'}</div>
                    </tr>
                    <tr>
                        <div class="slidecontainer">
                            <input className='statSlider1 slider' type="range" min="0" max="100" defaultValue="60" id="myRange1" onInput={this.onInput.bind(this), () => this.onInput(1)} />
                        </div>
                    </tr>
                    <tr>
                        <span>{this.state.home.map(home => home.sections.slice(1).map(section => section.stats.slice(1,2).map(stat => stat.title)))}</span>
                        <div id="statValue2" className={'statValues'} >{this.state.stat2 + '%'}</div>
                    </tr>
                    <tr>
                        <div class="slidecontainer">
                            <input className='statSlider2 slider' type="range" min="0" max="100" defaultValue="20" id="myRange2" onInput={this.onInput.bind(this), () => this.onInput(2)} />
                        </div>
                    </tr>
                    <tr>
                        <span>{this.state.home.map(home => home.sections.slice(1).map(section => section.stats.slice(2,3).map(stat => stat.title)))}</span>
                        <div id="statValue3" className={'statValues'} >{this.state.stat3 + '%'}</div>
                    </tr>
                    <tr>
                        <div class="slidecontainer">
                            <input className='statSlider3 slider' type="range" min="0" max="100" defaultValue="5" id="myRange3" onInput={this.onInput.bind(this), () => this.onInput(3)} />
                        </div>
                    </tr>
                    <tr>
                        <span>{this.state.home.map(home => home.sections.slice(1).map(section => section.stats.slice(3).map(stat => stat.title)))}</span>
                        <div id="statValue4" className={'statValues'} >{this.state.stat4 + '%'}</div>
                    </tr>
                    <tr>
                        <div class="slidecontainer">
                            <input className='statSlider4 slider' type="range" min="0" max="100" defaultValue="25" id="myRange4" onInput={this.onInput.bind(this), () => this.onInput(4)} />
                        </div>
                    </tr>
                </table>
            </div>
        </div>
    )
}
}

class SectionsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      CurSection: 'Section1'
    }
  }

  toggleSection = function (index) {
    if(index == 1 && this.state.CurSection == 'Section2')
    {
      document.getElementById('Section1').classList.toggle('Section-Disabled');
      document.getElementById('Section-option-1').classList.toggle('Option-Active');

      document.getElementById('Section2').classList.toggle('Section-Disabled');
      document.getElementById('Section-option-2').classList.toggle('Option-Active');

      this.setState({CurSection: 'Section1'});
    }
    else if(index == 2 && this.state.CurSection == 'Section1')
    {
      document.getElementById('Section2').classList.toggle('Section-Disabled');
      document.getElementById('Section-option-2').classList.toggle('Option-Active');

      document.getElementById('Section1').classList.toggle('Section-Disabled');
      document.getElementById('Section-option-1').classList.toggle('Option-Active');
      
      this.setState({CurSection: 'Section2'});
    }
  }

  render() {
    return(
      <div className={'section-options-container'}>
        <div id='Section-option-1' className={'section-options'} onClick={() => this.toggleSection(1)} >Section 1<span class="dot"></span></div>
        <div id='Section-option-2' className={'section-options'} onClick={() => this.toggleSection(2)} >Section 2<span class="dot"></span></div>
      </div>
    )
  }

  componentDidMount() {
    document.getElementById('Section-option-1').classList.toggle('Option-Active');
    document.getElementById('Section2').classList.toggle('Section-Disabled');
  }
}

ReactDOM.render(<Page />, document.getElementById('root'));