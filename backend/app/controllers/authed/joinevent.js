const express = require('express');
const router = express.Router();
const Group = require('../../models/group').Group;

const jsend = require('../../helpers/jsend');

router.post('/', (req, res) => {
  const groupId = req.body.groupId;
  const eventId = req.body.eventId;

  if (groupId == undefined || eventId == undefined) {
    jsend.sendFail(res, 400, {
      message: "please specify groupId or eventId"
    });
    return;
  }
  
  if (req.user.groups.indexOf(body.groupId) == -1) {
    jsend.sendFail(res, 400, {message: "user is not a member of that group"});
    return;
  }

  Group.findById(groupId).then(group => {
    if (group == null) {
      jsend.sendFail(res, 400, {
        message: "invalid groupId"
      });
      return;
    }

    // FIX: check if user is already in group

    // group.members.push(req.user._id);
    group.update({_id: groupId, "events._id": eventId}, {$push: {"events.$.participants": req.user._id}});

    Promise.all([group.save()]).then(docs => {
      jsend.sendSuccess(res, {});
    }).catch(err => { jsend.sendError(res, err); }); // is this catch necessary?
  }).catch(err => { jsend.sendError(res, err); });

});

module.exports = router;
