import React, { Component } from 'react';

class TEST extends Component {
  state = {
    startDisabled: false,
    callDisabled: true,
    hangUpDisabled: true,
    servers: null,
    client1: null,
    client2: null,
    localStream: null
  };

  localVideoRef = React.createRef();
  remoteVideoRef = React.createRef();

  start = () => {
    this.setState({ startDisabled: true });
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then(this.gotStream)
      .catch(err =>
        console.error(`navigator.getUserMedia error: ${err.toString()}`)
      );
  };

  gotStream = stream => {
    this.localVideoRef.current.srcObject = stream;
    this.setState({
      callDisabled: false,
      localStream: stream
    });
  };

  call = () => {
    this.setState({
      callDisabled: true,
      hangUpDisabled: false
    });

    const { localStream } = this.state;

    // Servers are needed because...
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCIceServer
    const servers = null;
    const client1 = new RTCPeerConnection(servers);
    const client2 = new RTCPeerConnection(servers);

    client1.onicecandidate = err => {
      this.onIceCandidate(client1, err);
    };

    client1.oniceconnectionstatechange = err => {
      this.onIceStateChange(client1, err);
    };

    client2.onicecandidate = err => {
      this.onIceCandidate(client2, err);
    };

    client2.oniceconnectionstatechange = err => {
      this.onIceStateChange(client2, err);
    };

    client2.ontrack = this.gotRemoteStream;

    localStream.getTracks().forEach(track => {
      client1.addTrack(track, localStream);
    });

    client1
      .createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      })
      .then(this.onCreateOfferSuccess, err => {
        console.error(`Failed to create session: ${err.toString()}`);
      });

    this.setState({
      servers,
      client1,
      client2,
      localStream
    });
  };

  onCreateOfferSuccess = desc => {
    const { client1, client2 } = this.state;

    client1
      .setLocalDescription(desc)
      .then(
        () => console.log('client1 setLocalDescription complete createOffer'),
        err =>
          console.error(
            'client1 Failed to set session description in createOffer',
            err.toString()
          )
      );

    client2.setRemoteDescription(desc).then(
      () => {
        console.log('client2 setRemoteDescription complete createOffer');
        client2
          .createAnswer()
          .then(this.onCreateAnswerSuccess, err =>
            console.error(
              `client2 Failed to set session description in createAnswer: ${err.toString()}`
            )
          );
      },
      err =>
        console.error(
          `client2 Failed to set session description in createOffer: ${err.toString()}`
        )
    );
  };

  onCreateAnswerSuccess = desc => {
    const { client1, client2 } = this.state;

    client1
      .setRemoteDescription(desc)
      .then(
        () => console.log('client1 setRemoteDescription complete createAnswer'),
        err =>
          console.error(
            `client1 Failed to set session description in onCreateAnswer: ${err.toString()}`
          )
      );

    client2
      .setLocalDescription(desc)
      .then(
        () => console.log('client2 setLocalDescription complete createAnswer'),
        err =>
          console.error(
            `client2 Failed to set session description in onCreateAnswer: ${err.toString()}`
          )
      );
  };

  onIceCandidate = (client, event) => {
    const { client1, client2 } = this.state;

    const otherClient = client === client1 ? client2 : client1;

    otherClient
      .addIceCandidate(event.candidate)
      .then(
        () => console.log('addIceCandidate success'),
        error => console.error(`failed to add ICE Candidate: ${err.toString()}`)
      );
  };

  onIceStateChange = (client, event) => {
    console.log("ICE state:", client.iceConnectionState)
  }

  hangUp = () => {
    const { client1, client2 } = this.state;

    client1.close();
    client2.close();

    this.setState({
      client1: null,
      client2: null,
      hangUpDisabled: true,
      callDisabled: false
    });
  };

  render() {
    const { startDisabled, callDisabled, hangUpDisabled } = this.state;

    return (
      <div>
        <h1 className="title is-3">WebRTC!!!</h1>
        <video
          ref={this.localVideoRef}
          autoPlay
          playsInline
          style={{ border: '3px solid red', width: '50%' }}
        />

        <video
          ref={this.remoteVideoRef}
          autoPlay
          playsInline
          style={{ border: '3px solid blue', width: '50%' }}
        />

        <div className="field is-grouped">
          <p className="control">
            <button
              className="button is-primary"
              onClick={this.start}
              disabled={startDisabled}
            >
              Start
            </button>
          </p>
          <p className="control">
            <button
              className="button is-primary"
              onClick={this.call}
              disabled={callDisabled}
            >
              Call
            </button>
          </p>
          <p className="control">
            <button
              className="button"
              onClick={this.hangUp}
              disabled={hangUpDisabled}
            >
              Hang Up
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default TEST;
